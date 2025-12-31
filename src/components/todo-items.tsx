import type { Todo } from "@/reducers";
import type { TodoFilter } from "@/components/todo-filters";

import TodoItem from "@/components/todo-item";
import { filterTodos } from "@/helpers";

export interface TodoItemsProps {
  todos: Todo[];
  filter: TodoFilter;
  onDelete: (id: string) => void;
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;
  onClearCompleted: () => void;
}

function TodoItems({
  todos,
  filter,
  onClearCompleted,
  ...delegated
}: TodoItemsProps) {
  const filteredTodos = todos.filter((todo) => filterTodos(todo, filter));
  const itemsLeft = filteredTodos.filter((todo) => !todo.completed).length;

  return (
    <div className="bg-foreground rounded-md shadow-xl mb-4 md:mb-0">
      <ul>
        {filteredTodos.map((props) => (
          <li key={props.id}>
            <TodoItem {...props} {...delegated} />
          </li>
        ))}
      </ul>
      <div className="h-12 flex items-center justify-between px-5 md:px-6 md:text-sm">
        <p className="text-secondary md:z-10">{itemsLeft} items left</p>
        <button
          className="hover:text-primary-foreground md:z-10"
          onClick={onClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoItems;

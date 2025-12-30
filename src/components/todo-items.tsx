import type { TodoFilter } from "@/App";
import TodoItem from "@/components/todo-item";
import { filterTodos } from "@/helpers";
import type { Todo } from "@/reducers";

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
    <div className="bg-foreground rounded-md shadow-xl mb-4">
      <ul>
        {filteredTodos.map((props) => {
          return (
            <li key={props.id}>
              <TodoItem {...props} {...delegated} />
            </li>
          );
        })}
      </ul>
      <div className="h-12 flex items-center justify-between px-5">
        <p className="text-secondary">{itemsLeft} items left</p>
        <button
          className="hover:text-primary-foreground"
          onClick={onClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default TodoItems;

import React from "react";

import type { TodoFilter } from "@/components/todo-filters";
import type { Todo } from "@/hooks/use-todos";

import { GripVertical } from "@/components/icons";
import TodoItem from "@/components/todo-item";
import { filterTodos } from "@/helpers";
import { usePreventSnapScroll } from "@/hooks/use-prevent-snap-scroll";
import { useTodosDnd } from "@/hooks/use-todos-dnd";
import { AnimatePresence, motion } from "motion/react";

export interface TodoItemsProps {
  todos: Todo[];
  filter: TodoFilter;
  onSort: (todos: Todo[]) => void;
  onDelete: (id: string) => void;
  onCheck: (id: string) => void;
  onUncheck: (id: string) => void;
  onClearCompleted: () => void;
}

function TodoItems({
  todos,
  filter,
  onSort,
  onClearCompleted,
  ...delegated
}: TodoItemsProps) {
  const dndContainerRef = React.useRef<HTMLUListElement | null>(null);

  const visibleTodos = todos.filter((todo) => filterTodos(todo, filter));
  const itemsLeft = visibleTodos.filter((todo) => !todo.completed).length;
  const isFiltered = filter !== "all";

  useTodosDnd({
    parent: dndContainerRef,
    todos: visibleTodos,
    onTodosSort: onSort,
    dragHandle: "#grip",
    draggingClass: "ghost",
    dragPlaceholderClass: "dragging",
  });

  usePreventSnapScroll(visibleTodos);

  return (
    <div className="bg-foreground rounded-md shadow-xl mb-4 md:mb-0">
      <ul ref={dndContainerRef} style={{ overflowAnchor: "none" }}>
        <AnimatePresence>
          {visibleTodos.map((props) => (
            <motion.li
              key={props.id}
              id={props.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative [&.ghost]:invisible [&.dragging]:bg-accent"
            >
              {!isFiltered && (
                <GripVertical
                  id="grip"
                  className="cursor-grab active:cursor-grabbing absolute top-1/2 -translate-1/2 left-4 size-5 md:left-5 md:size-6 lg:left-6"
                />
              )}
              <TodoItem {...props} {...delegated} />
            </motion.li>
          ))}
        </AnimatePresence>
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

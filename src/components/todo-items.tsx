import React from "react";

import type { Todo } from "@/reducers";
import type { TodoFilter } from "@/components/todo-filters";

import TodoItem from "@/components/todo-item";
import { extractStableReference, filterTodos } from "@/helpers";
import { dragAndDrop } from "@formkit/drag-and-drop/react";
import { GripVertical } from "@/components/icons";
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
  const stableTodos = extractStableReference(visibleTodos);
  const isFiltering = filter !== "all";

  const attachTodosDnd = React.useEffectEvent(() => {
    dragAndDrop({
      parent: dndContainerRef,
      state: [
        visibleTodos,
        (todosUpdate) => {
          const nextTodos =
            typeof todosUpdate === "function"
              ? todosUpdate(todos)
              : todosUpdate;
          onSort(nextTodos);
        },
      ],
      dragHandle: "#grip",
      // Only recognize visible items, ignore exiting animations,
      // preventing "number of draggable items" warning.
      // Needed because of AnimatePresence DOM manipulation
      draggable: (node) => {
        const validIds = new Set(visibleTodos.map((t) => t.id));
        return validIds.has(node.id);
      },
    });
  });

  React.useEffect(() => {
    attachTodosDnd();
  }, [stableTodos]);

  React.useEffect(() => {
    // Prevent snap scroll changes
    const scrollY = window.scrollY;
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [visibleTodos]);

  return (
    <div className="bg-foreground rounded-md shadow-xl mb-4 md:mb-0">
      <ul ref={dndContainerRef}>
        <AnimatePresence>
          {visibleTodos.map((props) => (
            <motion.li
              key={props.id}
              id={props.id}
              data-label={props.content}
              layoutId={props.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {!isFiltering && (
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

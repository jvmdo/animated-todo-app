import React, { type RefObject } from "react";

import type { Todo } from "@/hooks/use-todos";
import type { ReactDragAndDropConfig } from "@formkit/drag-and-drop/react";

import { extractStableReference } from "@/helpers";
import { animations } from "@formkit/drag-and-drop";
import { dragAndDrop } from "@formkit/drag-and-drop/react";

interface UseTodosDndParams
  extends Omit<
    ReactDragAndDropConfig<RefObject<HTMLUListElement | null>, Todo[]>,
    "state"
  > {
  todos: Todo[];
  onTodosSort: (todos: Todo[]) => void;
  dragHandle?: string;
  draggingClass?: string;
  dragPlaceholderClass?: string;
}

export function useTodosDnd({
  todos,
  onTodosSort,
  ...delegated
}: UseTodosDndParams) {
  const stableTodos = extractStableReference(todos);

  const attachTodosDnd = React.useEffectEvent(() => {
    dragAndDrop({
      ...delegated,
      //@ts-expect-error: ignoring the possibility of receiving a setter as argument
      state: [todos, onTodosSort],
      plugins: [animations()],
      // Partial fix for a bug where the class is not removed on drop
      onDragend: ({ draggedNode }) => {
        draggedNode.el.classList.remove("dragging");
      },
      // Only take account of visible items, preventing state and UI mismatch
      // Needed because of Motion's AnimatePresence performs DOM manipulation during exiting animations
      draggable: (node) => {
        const validIds = new Set(todos.map((t) => t.id));
        return validIds.has(node.id);
      },
    });
  });

  React.useEffect(() => {
    attachTodosDnd();
  }, [stableTodos]);
}

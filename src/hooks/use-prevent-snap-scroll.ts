import React from "react";

import { extractStableReference } from "@/helpers";
import type { Todo } from "@/hooks/use-todos";

export function usePreventSnapScroll(todos: Todo[]) {
  const stableTodos = extractStableReference(todos);

  // Put the scroll back to where it was before the list collapses,
  // preventing snap scroll changes caused by shortened content.
  // Smooth scrolling is consequence of items height animation.
  React.useEffect(() => {
    const scrollY = window.scrollY;
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [stableTodos]);
}

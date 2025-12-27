import type { Todo, TodoFilter } from "@/App";

export function filterTodos(todo: Todo, filter: TodoFilter) {
  switch (filter) {
    case "active": {
      return !todo.completed;
    }

    case "completed": {
      return todo.completed;
    }

    default: {
      return true;
    }
  }
}

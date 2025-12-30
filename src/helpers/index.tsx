import type { TodoFilter } from "@/App";
import type { Todo } from "@/reducers";

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

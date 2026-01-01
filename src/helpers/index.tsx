import type { TodoFilter } from "@/components/todo-filters";
import type { Todo } from "@/reducers";

export function extractStableReference(todos: Todo[]) {
  return JSON.stringify(todos);
}

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

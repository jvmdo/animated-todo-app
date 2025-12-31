import { produce } from "immer";

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type TodoAction = {
  type: "create" | "delete" | "check" | "uncheck" | "clear_checked";
  id?: string;
  content?: string;
};

export function todoReducer(todos: Todo[], action: TodoAction) {
  return produce(todos, (draft) => {
    switch (action.type) {
      case "create": {
        draft.unshift({
          id: action.id!,
          content: action.content!,
          completed: false,
        });
        break;
      }

      case "delete": {
        return draft.filter((todo) => todo.id !== action.id);
      }

      case "check": {
        const todo = draft.find((todo) => todo.id === action.id);
        if (todo) {
          todo.completed = true;
        }
        break;
      }

      case "uncheck": {
        const todo = draft.find((todo) => todo.id === action.id);
        if (todo) {
          todo.completed = false;
        }
        break;
      }

      case "clear_checked": {
        return draft.filter((todo) => !todo.completed);
      }
    }
  });
}

import { produce } from "immer";
import React from "react";

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type TodoAction = {
  type: "create" | "delete" | "check" | "uncheck" | "clear_checked" | "sort";
  id?: string;
  content?: string;
  todos?: Todo[];
};

const todoReducer = (todos: Todo[], action: TodoAction) => {
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

      case "sort": {
        return action.todos;
      }
    }
  });
};

export function useTodos() {
  const [todos, dispatch] = React.useReducer(todoReducer, initialTodos);

  const insertTodo = (todo: string) => {
    dispatch({
      type: "create",
      id: crypto.randomUUID(),
      content: todo,
    });
  };

  const removeTodo = (id: string) => {
    dispatch({ type: "delete", id });
  };

  const checkTodo = (id: string) => {
    dispatch({ type: "check", id });
  };

  const uncheckTodo = (id: string) => {
    dispatch({ type: "uncheck", id });
  };

  const clearCompletedTodos = () => {
    dispatch({ type: "clear_checked" });
  };

  const sortTodos = (todos: Todo[]) => {
    dispatch({ type: "sort", todos });
  };

  return [
    todos,
    {
      insertTodo,
      removeTodo,
      checkTodo,
      uncheckTodo,
      clearCompletedTodos,
      sortTodos,
    },
  ] as const;
}

export const initialTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    content: "This list is filled with a great amount of... fillers",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content:
      "Fillers will take up the space needed to show you all the beautiful animations",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content:
      'Items, List and the window itself have animations. Try filter by "completed". The list will shrink but no snap scroll changes will happen!',
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    content: "Jog around the park 3x",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content:
      "What happens if I can't check my Myspace when we get there? Tabs by Attack Attack!",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "15 minutes stretching",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Read for 1 hour",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Not the average American Tabs by Asking Alexandria",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Pick up groceries",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Unholy Confessions Tabs by Avenged Sevenfold",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    content: "Knives and Pens Tabs by Black Veil Brides",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Complete Todo App on Frontend Mentor",
    completed: true,
  },
  {
    id: crypto.randomUUID(),
    content: "Spirit Crusher Tabs by Death",
    completed: false,
  },
];

import type { Todo } from "@/reducers";

export const initialTodos: Todo[] = [
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
    content: "10 minutes meditation",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Read for 1 hour",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Pick up groceries",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content: "Complete Todo App on Frontend Mentor",
    completed: false,
  },
  {
    id: crypto.randomUUID(),
    content:
      "What happens if I can't check my Myspace when we get there? Tabs by Attack Attack!",
    completed: false,
  },
];

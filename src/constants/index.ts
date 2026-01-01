import type { Todo } from "@/reducers";

export const filters = ["all", "active", "completed"] as const;

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

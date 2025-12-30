import type { TodoItemsProps } from "@/components/todo-items";
import type { Todo } from "@/reducers";

import { Field } from "@base-ui/react/field";

type TodoItemProps = Todo &
  Pick<TodoItemsProps, "onCheck" | "onUncheck" | "onDelete">;

function TodoItem({
  id,
  onDelete,
  onCheck,
  onUncheck,
  completed,
  content,
}: TodoItemProps) {
  return (
    <Field.Root
      name="todo"
      className="min-h-13 py-1 px-5 border-b border-border flex gap-3 group"
    >
      <div className="self-center leading-0 relative group">
        <Field.Control
          type="checkbox"
          checked={completed}
          onChange={() => (completed ? onUncheck(id) : onCheck(id))}
          className="appearance-none size-5 border border-border rounded-full cursor-pointer peer"
        />
        <span className="grid place-items-center size-5 rounded-full border border-transparent peer-hover:not-peer-checked:checkbox-ring peer-checked:checkbox-gradient absolute inset-0 pointer-events-none">
          <CheckIcon className="opacity-0 scale-75 transition-opacity group-has-checked:opacity-100 group-has-checked:scale-100" />
        </span>
      </div>
      <Field.Label className="flex-1 flex items-center cursor-pointer group-has-checked:line-through group-has-checked:text-muted">
        {content}
      </Field.Label>
      <button
        type="button"
        className="self-center hover:text-red-400 invisible group-hover:visible group-focus-within:visible"
        onClick={() => onDelete(id)}
      >
        <CrossIcon />
      </button>
    </Field.Root>
  );
}

export default TodoItem;

function CrossIcon({ size = 12 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
  );
}

function CheckIcon({ className = "", size = 10, color = "#fff" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 11 9"
      fill="none"
      className={className}
    >
      <path
        fill="none"
        stroke={color}
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
}

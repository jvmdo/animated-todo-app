import { CheckIcon, CrossIcon } from "@/components/icons";
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

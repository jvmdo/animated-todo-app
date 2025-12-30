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
      className="min-h-13 py-1 px-5 border-b border-border flex gap-3 group md:min-h-15 md:py-2 md:px-6 md:gap-4 lg:min-h-16 lg:gap-6"
    >
      <div className="self-center leading-0 relative group">
        <Field.Control
          type="checkbox"
          checked={completed}
          onChange={() => (completed ? onUncheck(id) : onCheck(id))}
          className="appearance-none size-5 border border-border rounded-full cursor-pointer peer md:size-6"
        />
        <span className="grid place-items-center size-5 rounded-full border border-transparent peer-hover:not-peer-checked:checkbox-ring peer-checked:checkbox-gradient absolute inset-0 pointer-events-none md:size-6">
          <CheckIcon className="text-white size-2.5 opacity-0 scale-75 transition-opacity group-has-checked:opacity-100 group-has-checked:scale-100 md:size-3 lg:size-3.5" />
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
        <CrossIcon className="size-3 md:size-4 lg:size-5" />
      </button>
    </Field.Root>
  );
}

export default TodoItem;

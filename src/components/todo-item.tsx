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
    <Field.Root name="todo">
      <Field.Control
        type="checkbox"
        checked={completed}
        onChange={() => (completed ? onUncheck(id) : onCheck(id))}
      />
      <Field.Label>{content}</Field.Label>
      <button type="button" onClick={() => onDelete(id)}>
        X
      </button>
    </Field.Root>
  );
}

export default TodoItem;

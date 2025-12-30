import React, { type FormEvent } from "react";

import { Field } from "@base-ui/react/field";
import { Form } from "@base-ui/react/form";

function TodoInput({ onNewTodo }: { onNewTodo: (todo: string) => void }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const todo = value.trim();

    if (!todo) {
      return alert("Enter a valid TODO text");
    }

    onNewTodo(todo);
    setValue("");
  };

  // TODO FIX: field error should be outflow and red
  return (
    <Form onSubmit={handleSubmit}>
      <Field.Root className="relative mb-4">
        <Field.Control
          type="text"
          name="todo"
          placeholder="Create a new todo..."
          required={true}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          className="bg-foreground w-full rounded-md h-12 pl-13 pr-3 py-3 caret-accent"
        />
        <Field.Error />
        <span className="absolute top-1/2 -translate-y-1/2 left-5 w-5 h-5 border border-border rounded-full" />
      </Field.Root>
    </Form>
  );
}

export default TodoInput;

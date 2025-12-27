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

  return (
    <Form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Control
          type="text"
          name="todo"
          placeholder="Create a new todo..."
          required={true}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Field.Error />
      </Field.Root>
    </Form>
  );
}

export default TodoInput;

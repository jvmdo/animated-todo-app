import React from "react";

import TodoInput from "@/components/todo-input";
import TodoItems from "@/components/todo-items";
import TodoFilters from "@/components/todo-filters";
import { todoReducer } from "@/reducers";
import { initialTodos } from "@/constants";
import ThemeButton from "@/components/theme-button";

export type TodoFilter = "all" | "active" | "completed";

function App() {
  const [todos, dispatch] = React.useReducer(todoReducer, initialTodos);
  const [filter, setFilter] = React.useState<TodoFilter>("all");

  const handleCreateTodo = (todo: string) => {
    dispatch({
      type: "create",
      id: crypto.randomUUID(),
      content: todo,
    });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: "delete", id });
  };

  const handleCheckTodo = (id: string) => {
    dispatch({ type: "check", id });
  };

  const handleUncheckTodo = (id: string) => {
    dispatch({ type: "uncheck", id });
  };

  const handleClearCompleted = () => {
    dispatch({ type: "clear_checked" });
  };

  const handleChangeFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  return (
    <div className="bg-image bg-no-repeat bg-size-[100%_200px] pt-12 pb-6 px-6">
      <header className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-white tracking-[0.5rem] uppercase">
          Todo
        </h1>
        <ThemeButton />
      </header>
      <main>
        <TodoInput onNewTodo={handleCreateTodo} />
        <TodoItems
          todos={todos}
          filter={filter}
          onDelete={handleDeleteTodo}
          onCheck={handleCheckTodo}
          onUncheck={handleUncheckTodo}
          onClearCompleted={handleClearCompleted}
        />
        <TodoFilters filter={filter} setFilter={handleChangeFilter} />
        <p className="mt-8 text-center text-secondary">
          Drag and drop to reorder list
        </p>
      </main>
    </div>
  );
}

export default App;

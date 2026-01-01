import React from "react";

import TodoInput from "@/components/todo-input";
import TodoItems from "@/components/todo-items";
import { todoReducer, type Todo } from "@/reducers";
import { initialTodos } from "@/constants";
import ThemeButton from "@/components/theme-button";
import TodoFilters, { type TodoFilter } from "@/components/todo-filters";

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

  const handleSort = (todos: Todo[]) => {
    dispatch({ type: "sort", todos });
  };

  const handleChangeFilter = (filter: TodoFilter) => {
    setFilter(filter);
  };

  // TODO: extract logic into custom hooks

  return (
    <div className="bg-image bg-no-repeat bg-size-[100%_200px] pt-11 pb-6 px-6 md:bg-size-[100%_300px] md:pt-16 lg:pt-19">
      <div className="m-auto max-w-100 sm:max-w-120 md:max-w-135">
        <header className="flex items-baseline justify-between mb-8 md:mb-10">
          <h1 className="text-3xl font-bold text-white tracking-[0.5rem] uppercase md:text-4xl md:tracking-[0.75rem] lg:text-[40px] lg:tracking-[1rem]">
            Todo
          </h1>
          <ThemeButton />
        </header>
        <main>
          <TodoInput onNewTodo={handleCreateTodo} />
          {todos.length > 0 && (
            <div className="relative">
              <TodoItems
                todos={todos}
                filter={filter}
                onSort={handleSort}
                onDelete={handleDeleteTodo}
                onCheck={handleCheckTodo}
                onUncheck={handleUncheckTodo}
                onClearCompleted={handleClearCompleted}
              />
              <div className="md:absolute inset-x-0 bottom-0">
                <TodoFilters filter={filter} setFilter={handleChangeFilter} />
              </div>
            </div>
          )}
          <div className="mt-12 text-center ">
            {todos.length > 0 ? (
              <p className="text-secondary">"Drag and drop to reorder list"</p>
            ) : (
              <p className="text-primary md:text-white">
                Start by entering your first TODO in the box above
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

import type { TodoFilter } from "@/App";

function TodoFilters({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: TodoFilter) => void;
}) {
  return (
    <div>
      <button onClick={() => setFilter("all")} disabled={filter === "all"}>
        All
      </button>
      <button
        onClick={() => setFilter("active")}
        disabled={filter === "active"}
      >
        Active
      </button>
      <button
        onClick={() => setFilter("completed")}
        disabled={filter === "completed"}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;

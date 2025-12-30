import type { TodoFilter } from "@/App";

const filters = ["all", "active", "completed"];

function TodoFilters({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: TodoFilter) => void;
}) {
  return (
    <div className="h-12 bg-foreground flex items-center justify-center gap-5 rounded-md shadow-lg text-base font-bold">
      {filters.map((label) => {
        return (
          <button
            key={label}
            onClick={() => setFilter(label as TodoFilter)}
            disabled={label === filter}
            className={`hover:not-disabled:text-primary capitalize ${
              label === filter ? "text-accent" : ""
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TodoFilters;

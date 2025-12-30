import { MoonIcon, SunIcon } from "@/components/icons";
import React from "react";

type Theme = "light" | "dark";

function ThemeButton() {
  const [theme, setTheme] = React.useState<Theme>("light");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  const Icon = theme === "light" ? MoonIcon : SunIcon;

  return (
    <button className="text-white" onClick={handleThemeChange}>
      <Icon className="size-5 md:size-6 lg:size-7" />
    </button>
  );
}

export default ThemeButton;

import { MoonIcon, SunIcon } from "@/components/icons";
import React from "react";

type Theme = "light" | "dark";

function ThemeButton() {
  const [theme, setTheme] = React.useState<Theme>("light");

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button className="text-white" onClick={handleThemeChange}>
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ThemeButton;

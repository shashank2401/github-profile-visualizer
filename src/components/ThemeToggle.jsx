import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setDarkMode((prev) => !prev)}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow hover:scale-110 transition"
    >
      {darkMode ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;

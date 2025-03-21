import { useState, useEffect } from "react";

const DarkModeToggle = () => {
    // Load theme from localStorage or default to system preference
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    // Toggle dark mode and persist to localStorage
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("theme", newMode ? "dark" : "light");
            return newMode;
        });
    };

    // Apply the dark mode class to <html> tag on mount and state change
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded bg-gray-200 dark:bg-yellow-400 text-black dark:text-black transition duration-300"
        >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
};

export default DarkModeToggle;

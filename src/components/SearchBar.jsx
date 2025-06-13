import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-2 p-4 bg-white/70 dark:bg-gray-800/80 rounded-xl backdrop-blur shadow-lg max-w-lg mx-auto mb-10 transition-colors duration-300"
    >
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-2 rounded-l-lg bg-transparent text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300"
        aria-label="GitHub username"
        autoComplete="off"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg font-semibold hover:scale-105 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;

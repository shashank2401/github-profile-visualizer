const Loader = () => (
  <div className="flex items-center justify-center h-40">
    <svg className="animate-spin h-10 w-10 text-blue-500 dark:text-blue-300" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      />
    </svg>
  </div>
);

export default Loader;

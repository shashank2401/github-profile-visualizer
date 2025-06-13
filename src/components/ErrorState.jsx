const ErrorState = ({ message }) => (
  <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded-lg p-4 max-w-lg mx-auto my-8 text-center transition-colors duration-300">
    <span className="font-semibold">⚠️ {message}</span>
  </div>
);

export default ErrorState;

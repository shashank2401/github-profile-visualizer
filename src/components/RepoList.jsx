import { useState } from "react";
import { motion } from "framer-motion";

const gridContainerClass = "w-full max-w-[700px] h-[400px] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center justify-start";

const sortFunctions = {
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  forks: (a, b) => b.forks_count - a.forks_count,
  updated: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
};

const RepoList = ({ repos }) => {
  const [sortBy, setSortBy] = useState("stars");
  const [search, setSearch] = useState("");

  const filteredRepos = repos
    ?.filter(
      (repo) =>
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort(sortFunctions[sortBy])
    .slice(0, 5) || [];

  return (
    <div className={gridContainerClass + " mx-auto"}>
      <div className="w-full flex flex-col h-full">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Search repos..."
            className="flex-1 px-2 py-1 rounded bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 outline-none transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-2 py-1 rounded bg-gray-200/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 outline-none transition-colors"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="updated">Last Updated</option>
          </select>
        </div>
        <div className="flex-1 overflow-y-auto grid gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Showing top 5 repositories
            </p>
          {filteredRepos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 shadow hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  {repo.name}
                </span>
                <span className="text-yellow-600 dark:text-yellow-300">
                  ⭐ {repo.stargazers_count}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                {repo.description}
              </p>
              <span className="inline-block text-xs bg-blue-600/80 dark:bg-blue-800/70 text-white rounded px-2 py-0.5 mr-2">
                {repo.language || "Other"}
              </span>
              <span className="inline-block text-xs text-gray-600 dark:text-gray-300">
                Updated {new Date(repo.pushed_at).toLocaleDateString()}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RepoList;
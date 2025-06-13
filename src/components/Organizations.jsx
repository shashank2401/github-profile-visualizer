const gridContainerClass = "w-full max-w-[700px] bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col justify-start";

const Organizations = ({ orgs }) => {
  if (!orgs?.length) return null;
  return (
    <div className={gridContainerClass + " mx-auto mb-8"}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Organizations</h3>
      <div className="flex flex-wrap gap-4 w-full">
        {orgs.map((org) => (
          <a
            key={org.id}
            href={`https://github.com/${org.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <img src={org.avatar_url} alt={org.login} className="w-8 h-8 rounded-full" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{org.login}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
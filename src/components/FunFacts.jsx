import { FiCalendar, FiStar, FiZap } from "react-icons/fi";

const getFunFacts = (profile, repos, languageData) => {
  let mostStarredRepo = null;
  if (repos && repos.length > 0) {
    mostStarredRepo = repos.reduce((a, b) =>
      (a.stargazers_count || 0) > (b.stargazers_count || 0) ? a : b
    );
  }

  let mostUsedLanguage = "N/A";
  if (languageData && typeof languageData === "object" && Object.keys(languageData).length > 0) {
    mostUsedLanguage = Object.entries(languageData)
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  let joinDate = "Unknown";
  if (profile?.created_at) {
    try {
      joinDate = new Date(profile.created_at).toLocaleString("default", { month: "short", year: "numeric" });
    } catch {
      joinDate = profile.created_at;
    }
  }

  return {
    joined: joinDate,
    most_starred_repo: mostStarredRepo ? mostStarredRepo.name : "N/A",
    most_used_language: mostUsedLanguage,
  };
};

const FunFacts = ({ profile, repos, languageData }) => {
  const facts = getFunFacts(profile, repos, languageData);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto mb-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h3 className="text-lg font-semibold mb-4">Fun Facts</h3>
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-3">
          <FiCalendar className="text-green-400" />
          <span className="font-semibold">Joined GitHub:</span>
          <span>{facts.joined}</span>
        </li>
        <li className="flex items-center gap-3">
          <FiStar className="text-yellow-400" />
          <span className="font-semibold">Most Starred Repo:</span>
          <span>{facts.most_starred_repo}</span>
        </li>
        <li className="flex items-center gap-3">
          <FiZap className="text-pink-400" />
          <span className="font-semibold">Most Used Language:</span>
          <span>{facts.most_used_language}</span>
        </li>
      </ul>
    </div>
  );
};

export default FunFacts;

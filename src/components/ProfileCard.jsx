import { FiMapPin, FiBriefcase, FiLink, FiCalendar, FiAward, FiUsers, FiUserPlus } from "react-icons/fi";

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "short" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const ProfileCard = ({ profile }) => {
  if (!profile) return null;
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center gap-2 mb-8 max-w-md mx-auto mt-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <img
        src={profile.avatar_url}
        alt={profile.login}
        className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg mb-2"
      />
      <h2 className="text-2xl font-bold flex items-center gap-2">
        {profile.name || profile.login}
        {profile.site_admin && <FiAward className="text-yellow-400" title="GitHub Admin" />}
      </h2>
      <p className="text-blue-700 dark:text-blue-200">@{profile.login}</p>
      {profile.bio && <p className="text-gray-600 dark:text-gray-200 text-center">{profile.bio}</p>}
      <div className="flex flex-wrap gap-3 justify-center mt-2 text-sm text-blue-700 dark:text-blue-100">
        {profile.location && (
          <span className="flex items-center gap-1">
            <FiMapPin /> {profile.location}
          </span>
        )}
        {profile.company && (
          <span className="flex items-center gap-1">
            <FiBriefcase /> {profile.company}
          </span>
        )}
        {profile.blog && (
          <a
            href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 underline hover:text-blue-500 dark:hover:text-blue-300"
          >
            <FiLink /> Website
          </a>
        )}
        <span className="flex items-center gap-1">
          <FiCalendar /> Joined {formatDate(profile.created_at)}
        </span>
      </div>
      <div className="flex gap-4 mt-4">
        <a
          href={`https://github.com/${profile.login}?tab=followers`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1 bg-blue-500/80 dark:bg-blue-700/80 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-500 transition"
        >
          <FiUsers /> {profile.followers} Followers
        </a>
        <a
          href={`https://github.com/${profile.login}?tab=following`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1 bg-blue-500/80 dark:bg-blue-700/80 rounded text-white hover:bg-blue-600 dark:hover:bg-blue-500 transition"
        >
          <FiUserPlus /> {profile.following} Following
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;

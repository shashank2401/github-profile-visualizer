import { Timeline, TimelineEvent } from "react-event-timeline";
import {
  FiUserPlus,
  FiGitBranch,
  FiStar,
  FiUsers,
  FiBookOpen,
  FiAward,
  // Add other icons as needed
} from "react-icons/fi";

// Helper to format date
const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const buildTimeline = (profile, repos, orgs) => {
  const items = [];

  // 1. Joined GitHub
  if (profile?.created_at) {
    items.push({
      date: formatDate(profile.created_at),
      title: "Joined GitHub",
      icon: <FiUserPlus className="text-green-400" />,
      description: `Welcome, ${profile.login}!`,
    });
  }

  // 2. First public repository created
  if (repos && repos.length > 0) {
    const firstRepo = repos.reduce((a, b) =>
      new Date(a.created_at) < new Date(b.created_at) ? a : b
    );
    items.push({
      date: formatDate(firstRepo.created_at),
      title: "First Public Repository",
      icon: <FiGitBranch className="text-blue-400" />,
      description: firstRepo.name,
    });
  }

  // 3. Most starred repo
  if (repos && repos.length > 0) {
    const mostStarred = repos.reduce((a, b) =>
      (a.stargazers_count || 0) > (b.stargazers_count || 0) ? a : b
    );
    if (mostStarred.stargazers_count > 0) {
      items.push({
        date: formatDate(mostStarred.created_at),
        title: "Most Starred Repository",
        icon: <FiStar className="text-yellow-400" />,
        description: `${mostStarred.name} (${mostStarred.stargazers_count} ⭐)`,
      });
    }
  }

  // 4. Joined first organization
  if (orgs && orgs.length > 0) {
    items.push({
      date: "—",
      title: "Joined First Organization",
      icon: <FiUsers className="text-purple-400" />,
      description: orgs[0].login,
    });
  }

  // 5. Major follower milestone
  if (profile?.followers) {
    if (profile.followers >= 100) {
      items.push({
        date: "—",
        title: "100+ Followers!",
        icon: <FiAward className="text-pink-400" />,
        description: `Achieved ${profile.followers} followers`,
      });
    } else if (profile.followers >= 10) {
      items.push({
        date: "—",
        title: "10+ Followers!",
        icon: <FiAward className="text-pink-400" />,
        description: `Achieved ${profile.followers} followers`,
      });
    }
  }

  // 6. Major repo milestone
  if (profile?.public_repos) {
    if (profile.public_repos >= 100) {
      items.push({
        date: "—",
        title: "100+ Public Repos!",
        icon: <FiBookOpen className="text-indigo-400" />,
        description: `Created ${profile.public_repos} repositories`,
      });
    } else if (profile.public_repos >= 10) {
      items.push({
        date: "—",
        title: "10+ Public Repos!",
        icon: <FiBookOpen className="text-indigo-400" />,
        description: `Created ${profile.public_repos} repositories`,
      });
    }
  }

  return items;
};

const ActivityTimeline = ({ profile, repos, orgs }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-xl mx-auto mb-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4">Activity Timeline</h3>
    <Timeline>
      {buildTimeline(profile, repos, orgs).map((item, idx) => (
        <TimelineEvent
          key={idx}
          title={<span className="font-semibold text-gray-900 dark:text-gray-100">{item.title}</span>}
          createdAt={<span className="text-gray-700 dark:text-gray-300">{item.date}</span>}
          icon={item.icon}
          iconColor="#fff"
          bubbleStyle={{ backgroundColor: "#6366f1", color: "#fff" }}
          contentStyle={{
            background: "transparent",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <div className="text-gray-800 dark:text-gray-100 text-base">{item.description}</div>
        </TimelineEvent>
      ))}
    </Timeline>
  </div>
);

export default ActivityTimeline;

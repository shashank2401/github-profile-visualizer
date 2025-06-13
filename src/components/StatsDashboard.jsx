import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FiStar, FiGitBranch, FiUsers, FiUserPlus } from "react-icons/fi";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl p-4 flex flex-col items-center gap-2 shadow transition-colors duration-300"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className={`text-2xl ${color}`} />
    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      <CountUp end={value} duration={1.2} separator="," />
    </span>
    <span className="text-sm text-blue-700 dark:text-blue-200">{label}</span>
  </motion.div>
);

const StatsDashboard = ({ stats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-3xl mx-auto">
    <StatCard icon={FiStar} label="Stars" value={stats.stars} color="text-yellow-400" />
    <StatCard icon={FiGitBranch} label="Forks" value={stats.forks} color="text-green-400" />
    <StatCard icon={FiUsers} label="Followers" value={stats.followers} color="text-blue-500" />
    <StatCard icon={FiUserPlus} label="Following" value={stats.following} color="text-blue-400" />
  </div>
);

export default StatsDashboard;

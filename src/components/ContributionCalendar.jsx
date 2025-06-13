import GitHubCalendar from "react-github-calendar";

const ContributionCalendar = ({ username, compact = false }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg w-full max-w-[800px] mx-auto mb-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <h3 className="text-lg font-semibold mb-4">Contribution Activity</h3>
    <div className="overflow-x-auto mb-2 pb-6 flex justify-center scrollbar-custom" style={{ scrollbarGutter: "stable" }}>
      <div style={{ minWidth: 650, maxWidth: 700 }}>
        <GitHubCalendar
          username={username}
          blockMargin={2}
          blockRadius={8}
          fontSize={14}
          showWeekdayLabels
        />
      </div>
    </div>
  </div>
);

export default ContributionCalendar;
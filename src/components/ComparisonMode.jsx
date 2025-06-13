import ProfileCard from "./ProfileCard";
import FunFacts from "./FunFacts";
import ActivityTimeline from "./ActivityTimeline";
import Organizations from "./Organizations";
import StatsDashboard from "./StatsDashboard";
import LanguageChart from "./LanguageChart";
import RepoList from "./RepoList";

const Placeholder = ({ text }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center text-gray-400 dark:text-gray-500 min-h-[180px] flex items-center justify-center transition-colors duration-300">
    {text}
  </div>
);

const ComparisonMode = ({
  userA,
  userB,
  statsA,
  statsB,
  reposA,
  reposB,
  languageDataA,
  languageDataB,
  orgsA,
  orgsB,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto">
    {/* Row 1: Profile Cards */}
    <div>
      {userA ? <ProfileCard profile={userA} /> : <Placeholder text="Profile A will appear here" />}
    </div>
    <div>
      {userB ? <ProfileCard profile={userB} /> : <Placeholder text="Profile B will appear here" />}
    </div>
    {/* Row 2: Fun Facts */}
    <div>
      {userA ? <FunFacts profile={userA} repos={reposA} languageData={languageDataA} /> : null}
    </div>
    <div>
      {userB ? <FunFacts profile={userB} repos={reposB} languageData={languageDataB} /> : null}
    </div>
    {/* Row 3: Activity Timeline */}
    <div>
      {userA ? <ActivityTimeline profile={userA} repos={reposA} orgs={orgsA} /> : null}
    </div>
    <div>
      {userB ? <ActivityTimeline profile={userB} repos={reposB} orgs={orgsB} /> : null}
    </div>
    {/* Row 4: Organizations - always show a card for each user */}
    <div>
      {userA
        ? orgsA?.length > 0
          ? <Organizations orgs={orgsA} />
          : <Placeholder text="No organizations" />
        : null}
    </div>
    <div>
      {userB
        ? orgsB?.length > 0
          ? <Organizations orgs={orgsB} />
          : <Placeholder text="No organizations" />
        : null}
    </div>
    {/* Row 5: Stats Dashboard */}
    <div>
      {userA && statsA && Object.keys(statsA).length > 0 ? <StatsDashboard stats={statsA} /> : null}
    </div>
    <div>
      {userB && statsB && Object.keys(statsB).length > 0 ? <StatsDashboard stats={statsB} /> : null}
    </div>
    {/* Row 6: Language Chart */}
    <div>
      {userA && languageDataA && Object.keys(languageDataA).length > 0 ? <LanguageChart languageData={languageDataA} /> : null}
    </div>
    <div>
      {userB && languageDataB && Object.keys(languageDataB).length > 0 ? <LanguageChart languageData={languageDataB} /> : null}
    </div>
    {/* Row 7: Repo List */}
    <div>
      {userA && reposA && reposA.length > 0 ? <RepoList repos={reposA} /> : null}
    </div>
    <div>
      {userB && reposB && reposB.length > 0 ? <RepoList repos={reposB} /> : null}
    </div>
  </div>
);

export default ComparisonMode;
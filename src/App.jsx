import { useState } from "react";
import Loader from "./components/Loader";
import ErrorState from "./components/ErrorState";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import StatsDashboard from "./components/StatsDashboard";
import RepoList from "./components/RepoList";
import LanguageChart from "./components/LanguageChart";
import ThemeToggle from "./components/ThemeToggle";
import Organizations from "./components/Organizations";
import Footer from "./components/Footer";
import ComparisonMode from "./components/ComparisonMode";
import FunFacts from "./components/FunFacts";
import ActivityTimeline from "./components/ActivityTimeline";
import ContributionCalendar from "./components/ContributionCalendar";
import {
  fetchUserProfile,
  fetchUserRepos,
  fetchUserOrgs,
  fetchPRsCount,
  fetchIssuesCount,
} from "./api/github";
import {
  aggregateStars,
  aggregateForks,
  aggregateLanguages,
} from "./utils/dataProcessing";

const App = () => {
  // Single user states
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [orgs, setOrgs] = useState([]);
  const [languageData, setLanguageData] = useState({});
  const [stats, setStats] = useState({});

  // Comparison mode states
  const [comparisonMode, setComparisonMode] = useState(false);
  const [compareInputs, setCompareInputs] = useState({ userA: "", userB: "" });
  const [compareError, setCompareError] = useState("");
  const [userA, setUserA] = useState(null);
  const [reposA, setReposA] = useState([]);
  const [orgsA, setOrgsA] = useState([]);
  const [languageDataA, setLanguageDataA] = useState({});
  const [statsA, setStatsA] = useState({});
  const [userB, setUserB] = useState(null);
  const [reposB, setReposB] = useState([]);
  const [orgsB, setOrgsB] = useState([]);
  const [languageDataB, setLanguageDataB] = useState({});
  const [statsB, setStatsB] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper function to fetch user data
  const fetchUserData = async (username) => {
    const user = await fetchUserProfile(username);
    const repoList = await fetchUserRepos(username);
    const orgList = await fetchUserOrgs(username);
    const stars = aggregateStars(repoList);
    const forks = aggregateForks(repoList);
    const prs = await fetchPRsCount(username);
    const issues = await fetchIssuesCount(username);
    const languages = await aggregateLanguages(repoList, username);
    return { user, repoList, orgList, stars, forks, prs, issues, languages };
  };

  // Handle search for single user
  const handleSearchSingle = async (username) => {
    setLoading(true);
    setError("");
    setProfile(null);
    setRepos([]);
    setLanguageData({});
    setStats({});
    setOrgs([]);
    try {
      const {
        user,
        repoList,
        orgList,
        stars,
        forks,
        prs,
        issues,
        languages,
      } = await fetchUserData(username);
      setProfile(user);
      setRepos(repoList);
      setOrgs(orgList);
      setStats({
        stars,
        forks,
        prs,
        issues,
        followers: user.followers,
        following: user.following,
      });
      setLanguageData(languages);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  // Handle search for user A in comparison mode
  const handleSearchA = async (username) => {
    setUserA(null);
    setReposA([]);
    setLanguageDataA({});
    setStatsA({});
    setOrgsA([]);
    try {
      const {
        user,
        repoList,
        orgList,
        stars,
        forks,
        prs,
        issues,
        languages,
      } = await fetchUserData(username);
      setUserA(user);
      setReposA(repoList);
      setOrgsA(orgList);
      setStatsA({
        stars,
        forks,
        prs,
        issues,
        followers: user.followers,
        following: user.following,
      });
      setLanguageDataA(languages);
    } catch {
      // Do nothing, keep compareError logic simple
    }
  };

  // Handle search for user B in comparison mode
  const handleSearchB = async (username) => {
    setUserB(null);
    setReposB([]);
    setLanguageDataB({});
    setStatsB({});
    setOrgsB([]);
    try {
      const {
        user,
        repoList,
        orgList,
        stars,
        forks,
        prs,
        issues,
        languages,
      } = await fetchUserData(username);
      setUserB(user);
      setReposB(repoList);
      setOrgsB(orgList);
      setStatsB({
        stars,
        forks,
        prs,
        issues,
        followers: user.followers,
        following: user.following,
      });
      setLanguageDataB(languages);
    } catch {
      // Do nothing, keep compareError logic simple
    }
  };

  // Comparison mode input logic
  const handleCompareInputChange = (e) => {
    const { name, value } = e.target;
    setCompareInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompareSubmit = async (e) => {
    e.preventDefault();
    setCompareError("");
    setUserA(null);
    setUserB(null);
    setReposA([]);
    setReposB([]);
    setLanguageDataA({});
    setLanguageDataB({});
    setStatsA({});
    setStatsB({});
    setOrgsA([]);
    setOrgsB([]);
    if (!compareInputs.userA.trim() || !compareInputs.userB.trim()) {
      setCompareError("Enter both profiles");
      return;
    }
    setLoading(true);
    await Promise.all([
      handleSearchA(compareInputs.userA.trim()),
      handleSearchB(compareInputs.userB.trim()),
    ]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <ThemeToggle />
      <header>
        <h1 className="text-center text-3xl font-bold pt-10 mb-6">
          GitHub Profile Visualizer
        </h1>
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              !comparisonMode ? "bg-blue-600" : "bg-gray-600"
            } text-white`}
            onClick={() => setComparisonMode(false)}
          >
            Single Profile
          </button>
          <button
            className={`px-4 py-2 rounded ${
              comparisonMode ? "bg-blue-600" : "bg-gray-600"
            } text-white`}
            onClick={() => setComparisonMode(true)}
          >
            Compare Profiles
          </button>
        </div>
        {!comparisonMode ? (
          <SearchBar onSearch={handleSearchSingle} />
        ) : (
          <>
            <form
              className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl mx-auto items-center"
              onSubmit={handleCompareSubmit}
            >
              <input
                type="text"
                name="userA"
                placeholder="GitHub Username A"
                value={compareInputs.userA}
                onChange={handleCompareInputChange}
                className="flex-1 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300"
              />
              <input
                type="text"
                name="userB"
                placeholder="GitHub Username B"
                value={compareInputs.userB}
                onChange={handleCompareInputChange}
                className="flex-1 px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white outline-none placeholder:text-gray-400 dark:placeholder:text-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded font-semibold hover:scale-105 transition"
              >
                Search
              </button>
            </form>
            {compareError && (
              <div className="w-full text-center text-red-400 mb-4">
                {compareError}
              </div>
            )}
          </>
        )}
      </header>

      <main className="flex-1 flex flex-col gap-8 mt-6">
        {loading && <Loader />}
        {error && <ErrorState message={error} />}

        {!comparisonMode && profile && (
          <div className="flex flex-col items-center gap-8">
            <ProfileCard profile={profile} />
            <FunFacts
              profile={profile}
              repos={repos}
              languageData={languageData}
            />
            <ActivityTimeline
              profile={profile}
              repos={repos}
              orgs={orgs}
            />
            <ContributionCalendar username={profile.login} />
            {orgs.length > 0 && <Organizations orgs={orgs} />}
            {stats && Object.keys(stats).length > 0 && (
              <StatsDashboard stats={stats} />
            )}
            {Object.keys(languageData).length > 0 && (
              <LanguageChart languageData={languageData} />
            )}
            {repos.length > 0 && <RepoList repos={repos} />}
          </div>
        )}

        {comparisonMode && (
          <ComparisonMode
            userA={userA}
            userB={userB}
            statsA={statsA}
            statsB={statsB}
            reposA={reposA}
            reposB={reposB}
            languageDataA={languageDataA}
            languageDataB={languageDataB}
            orgsA={orgsA}
            orgsB={orgsB}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
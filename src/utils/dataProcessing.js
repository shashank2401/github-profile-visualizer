import { fetchRepoLanguages } from "../api/github";

export const aggregateStars = (repos) =>
  repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

export const aggregateForks = (repos) =>
  repos.reduce((sum, repo) => sum + repo.forks_count, 0);

export const fetchPRsCount = async (username) => {
  const res = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`);
  const data = await res.json();
  return data.total_count || 0;
};

export const fetchIssuesCount = async (username) => {
  const res = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`);
  const data = await res.json();
  return data.total_count || 0;
};

export const aggregateLanguages = async (repos, username) => {
  let languageTotals = {};
  for (const repo of repos) {
    const langData = await fetchRepoLanguages(username, repo.name);
    for (const [lang, bytes] of Object.entries(langData)) {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
    }
  }
  const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
  const languagePercentages = {};
  for (const [lang, bytes] of Object.entries(languageTotals)) {
    languagePercentages[lang] = Number(((bytes / totalBytes) * 100).toFixed(2));
  }
  return languagePercentages;
};

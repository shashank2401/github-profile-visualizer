import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const headers = token
  ? { Authorization: `Bearer ${token}` }
  : {};

export const fetchUserProfile = async (username) => {
  const res = await axios.get(`https://api.github.com/users/${username}`, { headers });
  return res.data;
};

export const fetchUserRepos = async (username) => {
  const res = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    { headers }
  );
  return res.data;
};

export const fetchRepoLanguages = async (username, repo) => {
  const res = await axios.get(
    `https://api.github.com/repos/${username}/${repo}/languages`,
    { headers }
  );
  return res.data;
};

export const fetchUserOrgs = async (username) => {
  const res = await axios.get(
    `https://api.github.com/users/${username}/orgs`,
    { headers }
  );
  return res.data;
};

// For PRs and issues, use fetch since it's a search endpoint
export const fetchPRsCount = async (username) => {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:pr`,
    { headers }
  );
  const data = await res.json();
  return data.total_count || 0;
};

export const fetchIssuesCount = async (username) => {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${username}+type:issue`,
    { headers }
  );
  const data = await res.json();
  return data.total_count || 0;
};

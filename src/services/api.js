// const BASE_URL = process.env.API_BASE_URL;
const BASE_URL = "http://localhost:3000";

// export const getIssues = async () => {
//   const response = await fetch(`${BASE_URL}/api/issues`);
//   return await response.json();
// };

// export const getIssues = async () => {
//   const response = await fetch('https://issues2022.herokuapp.com/api/issues');
//   return await response.json();
// };

const headers = {
  "Content-type": "application/json; charset=UTF-8",
};

export const search = async (q) => {
  const response = await fetch(`${BASE_URL}/api/search?q=${q}`, {
    headers,
  });
  return await response.json();
};

export const getIssues = async () => {
  const response = await fetch(`${BASE_URL}/api/issues`, {
    headers,
  });
  return await response.json();
};

export const getIssue = async (id) => {
  const response = await fetch(`${BASE_URL}/api/issues/${id}`, {
    headers,
  });
  return await response.json();
};

export const deleteIssue = async (id) => {
  const response = await fetch(`${BASE_URL}/api/issues/${id}`, {
    method: "DELETE",
    headers,
  });
  return await response.json();
};

export const updateIssue = async (issue) => {
  console.log(issue);
  const response = await fetch(`${BASE_URL}/api/issues/${issue.id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(issue),
  });
  return await response.json();
};

export const createIssue = async (issue) => {
  const formData = new FormData();
  formData.append("title", issue.title);
  formData.append("file", issue.file, issue.file.name);
  const response = await fetch(`${BASE_URL}/api/issues`, {
    method: "POST",
    body: formData,
    redirect: "follow",
  });
  return await response.json();
};

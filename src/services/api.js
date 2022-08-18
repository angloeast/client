const BASE_URL = process.env.API_BASE_URL;

export const getIssues = async () => {
  const response = await fetch(`${BASE_URL}/api/issues`);
  return await response.json();
};

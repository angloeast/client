export const getIssues = async () => {
  const response = await fetch('http://localhost:3000/api/issues');
  return await response.json();
}
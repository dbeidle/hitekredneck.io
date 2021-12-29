export default async function getJsonData() {
  const response = await fetch(`https://localhost:5600/api/projects`);
  const jsonData = await response.json();
  return jsonData;
}

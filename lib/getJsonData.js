export default async function getJsonData() {
  const response = await fetch(`http://localhost:5600/api/projects`);
  const jsonData = await response.json();
  return jsonData;
}

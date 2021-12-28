export default async function getJsonData() {
  const response = await fetch(`https://hitekredneck.io/api/projects`);
  const jsonData = await response.json();
  return jsonData;
}

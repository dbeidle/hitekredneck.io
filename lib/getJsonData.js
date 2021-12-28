export default async function getJsonData() {
  const PORT = process.env.NODE_ENV === "development" ? 8080 : 5600;

  const response = await fetch(`http://localhost:${PORT}/api/projects`);
  const jsonData = await response.json();
  return jsonData;
}

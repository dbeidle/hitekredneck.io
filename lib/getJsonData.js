export default async function getJsonData() {
  const URL =
    process.env.NODE_ENV === "development"
      ? "localhost:8080"
      : "hitekredneck.io:5600";
  const response = await fetch(`https://${URL}/api/projects`);
  const jsonData = await response.json();
  return jsonData;
}

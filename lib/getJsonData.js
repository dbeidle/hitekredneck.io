export default async function getJsonData() {
  const response = await fetch(
    `http://localhost:${process.env.PORT}/api/projects`
  );
  const jsonData = await response.json();
  return jsonData;
}

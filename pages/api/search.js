export default function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    res.status(200).json([{ search: "works" }]);
  } else {
    res.status(405).send(`${method} not allowed`);
  }
}

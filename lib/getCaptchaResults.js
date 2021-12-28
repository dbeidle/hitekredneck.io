export default async function getCaptchaResults(response_key) {
  // Call to the NextJS API to verify the reCaptcha results.
  console.log("RESPONSEKEY", response_key);
  const PORT = process.env.NODE_ENV === "development" ? 8080 : 5600;
  const response = await fetch(
    `http://localhost:${PORT}/api/validate_captcha`,
    {
      method: "post",
      body: JSON.stringify({ captcha: response_key }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("API RESPONSE", response);
  return response;
}

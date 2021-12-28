export default async function getCaptchaResults(response_key) {
  const URL =
    process.env.NODE_ENV === "development"
      ? "localhost:8080"
      : "hitekredneck.io";
  // Call to the NextJS API to verify the reCaptcha results.
  console.log("RESPONSEKEY", response_key);
  const response = await fetch(`http://${URL}/api/validate_captcha`, {
    method: "post",
    body: JSON.stringify({ captcha: response_key }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("API RESPONSE", response);
  return response;
}

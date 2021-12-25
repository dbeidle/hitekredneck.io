export default async function getCaptchaResults(response_key) {
  // Call to the NextJS API to verify the reCaptcha results.
  console.log("RESPONSEKEY", response_key);
  const response = await fetch("http://localhost:8080/api/validate_captcha", {
    method: "post",
    body: JSON.stringify({ captcha: response_key }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("API RESPONSE", response);
  return response;
}

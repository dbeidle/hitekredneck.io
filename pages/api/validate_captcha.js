export default async function handler(req, res) {
  const { body, method } = req;
  // Extract the email and captcha code from the request body
  const { captcha } = body;
  console.log("CAPTCHA", captcha);
  if (method === "POST") {
    // If email or captcha are missing return an error
    if (!captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please tick the reCaptcha box.",
      });
    }
    try {
      // Ping the google recaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}`,
        {
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          // },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      /**
       * The structure of response from the veirfy API is
       * {
       *  "success": true|false,
       *  "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
       *  "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
       *  "error-codes": [...]        // optional
        }
       */
      console.log("validation", captchaValidation);
      if (captchaValidation.success) {
        // Return 200 OK if successful
        return res.status(200).send("OK");
      }

      return res.status(400).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      console.log("reCaptcha Error", error);
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone pings the API with a method other than
  // POST
  return res.status(404).send("Not found");
}

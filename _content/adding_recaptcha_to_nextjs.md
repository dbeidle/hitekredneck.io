---
title: "Adding reCaptcha to NextJS"
layout: "post"
date: "2022-01-11T17:05:36.929Z"
summary: "I added Google's reCaptcha to my contact page inside NextJS to try and keep spammers away from my email address!"
hero: "/blog_heros/stlouis_arch.jpg"
hero_alt: "Gateway Arch in St. Louis, Missouri"
tags: ["next", "javascript", "react", "reCaptcha", "blog"]
---

## The problem

I really didn't want to expose my email address on my blog page like I had in the last version. I think I got lucky that either no one visited the site or no one got ahold of it to be able to start spamming me. To prevent this, I decided to use Google reCaptcha on a contact form that will send me an email whenever someone sends me a message through it.

## The basics

I added a simple form to my project that takes in a person's name, e-mail address, and message in a single component on the application. That was the easy part. I also added in a couple of simple regex validations on the name/email input types and added a validation that the message body can't be empty.

## Google reCaptcha

You will need to setup reCaptcha on the [Google's](https://developers.google.com/recaptcha) website. Then you will need to create a project for reCaptcha. I used v2 with the checkbox to keep it nice and clear what is going on. Make sure you save your API keys and put them into a .env file for easy consumption into the app.

You will get 2 keys, one is a public key, the second is a private key and should not be saved in your project or pushed to Github. I have plans to add an article on the importance of .env files and protecting your API keys at a later date.

## The Code

I used a package called `react-google-recaptcha` in my project. This has a very simple install by way of npm or yarn

```sh
yarn add react-google-recaptcha
```

or

```sh
npm i react-google-recaptcha
```

Once the installation is complete, You can add it into your contact page with an ES6 import.

```js
import ReCAPTCHA from "react-google-recaptcha";
```

In your return for the actual page, you will add it as below.

```jsx
<ReCAPTCHA
  ref={recaptchaRef}
  size="normal"
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC}
  onChange={() => validateCaptcha()}
/>
```

Import useRef and useState from React and create a validateCaptcha function as below. you will utilize the useState ref to verify that the response received was valid.

```jsx
import { useState, useRef } from "react";

const [valid, setValid] = useState(false);
const recaptchaRef = useRef();

const validateCaptcha = async () => {
  const token = await recaptchaRef.current.getValue();
  const res = await fetch("https://localhost:8080/api/validateCaptcha", {
    method: "POST",
    body: JSON.stringify({ captcha: token }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Kick off the reCaptcha
  setValid(res.ok);
};
```

I created a validate captcha API route in my NextJS app.

```js
export default async function handler(req, res) {
  const { body, method } = req;
  // Extract the captcha code from the request body
  const { captcha } = body;
  if (method === "POST") {
    // reCaptcha code is missing return an error
    if (!captcha) {
      return res.status(422).json({
        message: "Unproccesable request, please tick the reCaptcha box.",
      });
    }
    try {
      // send a request to the Google reCaptcha verify API to verify the captcha code you received
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();

      if (captchaValidation.success) {
        // Return 200 OK if successful
        return res.status(200).send("OK");
      }

      return res.status(400).json({
        message: "Unproccesable request, Invalid captcha code",
      });
    } catch (error) {
      return res.status(422).json({ message: "Something went wrong" });
    }
  }
  // Return 404 if someone queries the API with a method other than POST
  return res.status(404).send("Not found");
}
```

When there is a successful response from the API, you will then use the useState set function in the validate function on the contact page to return True if valid.

The next step is to send data to the backend via another API route to handle the backend email functionality. Then return if it was successful and display a modal letting the user know the request was successful or let them know if they are missing any fields in the form.

## Take Aways

I was able to get this working in my dev environment with no issues but I had a small hiccup when I deployed it to production. I had not thought about the API routes and calling of them on the prod site and left that info as though it were in my dev environment. To that end, I had errors getting the reCaptcha to work until I changed the fetch call in my captchaValidate function to include my fqdn for the site instead of localhost. Once that change was made, my reCaptcha started working properly and the submission of the message started working properly again afterwards.

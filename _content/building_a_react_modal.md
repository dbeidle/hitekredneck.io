---
title: "Building a React Modal"
layout: "post"
date: "2022-02-05T13:12:18.227Z"
summary: "I had a need for a confirmation/error modal to be added into my Next JS site so I built one from scratch."
hero: "/blog_heros/japan-1273963.jpg"
hero_alt: "Torii Gate"
tags: ["next", "javascript", "react", "modal"]
---

### The Requirement

As I was building out this site I found that I wanted a confirmation or error modal displayed after the submission of the contact page form. I didn't need anything elaborate so I set my sites on building a modal.

## The first step

Knowing what I needed was half the battle. I now needed to build something I had not done in the past. I knew the basics that I wanted which were to darken the background behind the modal and show the element itself. In this project, I am using a layout component to act as the basic layout for every page. The code for it is below:

```jsx
import Footer from "./footer";
import NavBar from "./navbar";
export default function Layout({ children }) {
  return (
    <div className="flex w-screen min-h-screen flex-col" id="parent">
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
```

You will note that in the parent div, I gave it an ID of "parent". I needed this particular ID so that the div could be rendered at the base of the app and cover every thing to prevent clicking on a menu button or anything inside my footer.

### Required Components

I decided to use a couple of the [FontAwesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free) free icons. I had already added the FontAwesome libraries to my project when creating the footer for the social icons with

`yarn add @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons`

All of the styles are implemented with [tailwindcss](https://tailwindcss.com/) which I added at the very beginning of building the app. The only other things I needed were useState and useEffect from the React library and ReactDOM from the react-dom library.

### The setup

I had done a little research on different ways that people have added modals to React projects. There is a lot of info out there. I used a few things I found online and then I started adding import statements for the things I would be using.

```jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
```

This was the easy part. Most modals are simple and serve a single purpose. The one I was creating would be used for a success confirmation or an error display. This required a little out of the box thinking so I decided to pass the info in as props to my modal. I knew I wanted to execute a function on the contact page after the ok button was clicked so I passed a function into my props as well. I also love using purely functional components.

```jsx
export default props => {
  const { info, buttonClick } = props;

  # Return just a div with the type of modal to be displayed
  return (
      <div> {info.type} </div>
  )
```

From my earlier research I found that I needed to add in a useState call and a useEffect call so that the render wasn't done until the modal was called. I also wanted to return one of two Icons I chose so I created a function for it and created those within the function.

```jsx
export default props => {
  const { info, buttonClick } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const Icon = info => {
    if (info.type === "error") {
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
    } else {
      return <FontAwesomeIcon icon={faCheck} />;
    }
  };

  # Return just a div with the type of modal to be displayed
  return (
      <div> {info.type} </div>
  )
```

### Displaying the modal on the page above everything else

Now we get into the part that was a little harder to figure out. Thanks to the earlier research I had a decent foundation to work with.

I started by adding in the return statement for the modal. Here is where we make use of the ReactDOM component. I started with a simple check of the isLoaded boolean and then returned the modal or null. I also added a conditional to display the required Icon based on the type sent and also add specific styling depending on the type.

```jsx
export default props => {
  const { info, buttonClick } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const Icon = info => {
    if (info.type === "error") {
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
    } else {
      return <FontAwesomeIcon icon={faCheck} />;
    }
  };

  if (isLoaded) {
    return ReactDOM.createPortal(
      <div
        className="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal">
        <div className="relative top-20 mx-auto p-5 border border-sb-light w-96 shadow-lg rounded-md bg-sb-norm">
          <div className="mt-3 text-center">
            {info.type === "error" ? (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            ) : (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            )}
          </div>
        </div>
      </div>,
      document.getElementById("parent")
    );
  } else {
    return null;
  }
};
```

### The finishing touches

The rest of the code was just figuring out the elements I wanted to use inside of the modal and how to hook them up.

```jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default props => {
  const { info, buttonClick } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const Icon = info => {
    if (info.type === "error") {
      return <FontAwesomeIcon icon={faExclamationTriangle} />;
    } else {
      return <FontAwesomeIcon icon={faCheck} />;
    }
  };

  if (isLoaded) {
    return ReactDOM.createPortal(
      <div
        className="fixed insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal">
        <div className="relative top-20 mx-auto p-5 border border-sb-light w-96 shadow-lg rounded-md bg-sb-norm">
          <div className="mt-3 text-center">
            {info.type === "error" ? (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            ) : (
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 border-sb-dark border-2">
                <Icon type={info.type} />
              </div>
            )}

            <h3 className="text-lg leading-6 font-medium text-sb-light">
              {info.head}
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-sb-light whitespace-pre">
                {info.text}
              </p>
            </div>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                onClick={buttonClick}
                className="px-4 py-2 bg-sb-dark ring-1 ring-sb-med text-white 
                      text-base font-medium rounded-md w-full 
                      shadow-sm hover:bg-sb-light hover:ring-sb-dark hover:text-sb-norm focus:outline-none focus:ring-2 focus:ring-sb-dark">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById("parent")
    );
  } else {
    return null;
  }
};
```

When I call my modal in my contact page, I send over the props and the buttonClick function.

` <Modal info={modal} buttonClick={() => dismissModal()} />`

And here is the finished product:

![Modal Screenshot](https://hitekredneck.io/images/modal.png)

I hope you found this informative and can use what you have learned here in your next project!

---
title: "The Trek to NextJS part 1"
layout: "post"
date: "2021-12-29T14:00:34.444Z"
summary: "The trials and tribulations of converting my Bootstrap portfolio over to NextJS and TailwindCSS"
hero: "/blog_heros/japan-1706942.jpg"
hero_alt: "Mount Fuji"
tags: ["next", "javascript", "react", "tailwindcss", "blog"]
---

## Making the decision

I knew I wanted to rebuild my portfolio site to better reflect my skills and still have an easy to update code base. I considered and a few different frameworks before settling on NextJS. I had a run at building the site in Gatsby but I just wasn't feeling the flow of it. I had ofcourse heard of NextJS over time and decided to give it a shot as well as using tailwindcss in the project. I like to keep learning new things to stay on top of what is out there which can be a painpoint for me at times. I had heard good things in the past about both NextJS and TailwindCSS so it was time to give them a shot.

### Creating the new project

I started with a basic template provided by NextJS which was `yarn create next-app --example with-tailwindcss app_name` This built most of the skeleton for me. I then ran `yarn tailwindcss init -p` in the project directory to initialize the tailwind css.

I removed all of the boiler plate from the project and started fresh with an index.js page in the pages directory. I then decided I wanted a couple of specific fonts in the project which caused me to create an \_document.js file in the main directory. I made use of several next components by importing them into this file.

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/images/favicon-16x16.png" />
          <link rel="icon" type="image/png" href="/images/favicon-32x32.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+1+Code&display=swap"
            rel="stylesheet"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Genos&display=swap"
            rel="stylesheet"></link>
        </Head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
        <body className="bg-sb-norm text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Adding styles with tailwindcss

I took a little time to figure out the color scheme I wanted to use for the site. I had to edit the `tailwind.config.js` file to bring those colors into the project. You have to be careful how you add colors or elements as you can easily overwrite the tailwindcss that has been brought into your project. To add new information to tailwindcss you need to extend the theme. Which I did to have my colors callable in tailwind css classnames. You can see an example of that in the body tag of the \_document.js above. the `bg-sb-norm` class name gives the whole page a steelblue color. There are several base colors you can choose from to use already in tailwind but I wanted some that weren't in there.

```js
module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "sb-norm": "#4682b4",
        "sb-dark": "#31697e",
        "sb-light": "#d8f4ff",
        "sb-med": "#b1eaff",
      },
    },
  },
};
```

### The landing page

I then started work on my navbar component. I added a components directory at the root of my project structure and created a new JS file there to provide the basis for the navbar. I decided early on that I wanted to utilize FontAwesome icons to I added them into the project at this time.

```bash
yarn add @fortawesome/fontawesome-svg-core @fortawesome/free-brands-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

I dropped in the imports to the navbar.js page. I knew from a previous project that I would need to add the useState hook from the react library.

```jsx
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
```

The next step was to finish off the navbar component. It took quite a bit of trial and error and refactoring to try and keep the codebase with out too many repeated elements. I created a small function that takes in a string of classes and returns the menu bar in either the mobile/small screen size or the desktop size. I wanted them to be a11y so I made sure when the small menu is opened the focus is put onto the first element in the menu. It took some trial and error learning the tailwind way of doing things but I did like the fact they use a mobile first breakpoint styling.

```jsx
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const set_focus = document.getElementById("focus_me");
    setTimeout(() => {
      set_focus.focus();
    }, 1);
  };

  const Menu = css => {
    return (
      <ul className={String(css.classes)} role="dialog" id="menu">
        <a id="focus_me" href="/about" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 focus:ring-1 focus:ring-sb-dark hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            About
          </li>
        </a>
        <a href="/blog" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Blog
          </li>
        </a>
        <a href="/projects" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Projects
          </li>
        </a>
        <a href="/contact" onClick={isMenuOpen ? toggleMenu : null}>
          <li className="px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
            Contact
          </li>
        </a>
        <li className="cursor-pointer sm:hidden px-5 py-2 hover:border-b-4 hover:border-sb-dark hover:border-solid sm:hover:border-sb-light">
          <button onClick={isMenuOpen ? toggleMenu : null}>Close</button>
        </li>
      </ul>
    );
  };

  return (
    <nav>
      <div
        className="absolute w-full flow-root justify-between mt-3 uppercase font-header tracking-widest border-sb-med border-solid border-b-2 border-opacity-50 pb-4 "
        id="nav-bar">
        <div className="m-auto ml-7 float-left inline-flex">
          <Link href="/">Home</Link>
        </div>
        <div className="sm:hidden float-right px-5">
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="menu">
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
        {isMenuOpen ? (
          <Menu
            aria-hidden={!isMenuOpen}
            aria-labelledby="menu-btn"
            classes="absolute w-40 bg-sb-light text-sb-dark border-solid border-black border-2 flex flex-col top-5 right-6 items-center py-3 z-10"
          />
        ) : (
          <Menu classes="absolute -top-2 right-0 m-auto mr-5 float-right hidden sm:inline-flex " />
        )}
      </div>
    </nav>
  );
}
```

Once I worked out the quirks of the small screen menu and positioning the navbar and menu items, I added the navbar component into the index.js file.

This will conclude part 1 in this series. I will try to guide you the best that I can in how I built my app and the mistakes I made along the way.

You can view the full source code for this site on [Github](https://github.com/dbeidle/hitekredneck.io)

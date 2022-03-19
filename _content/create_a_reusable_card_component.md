---
title: "Create a Reusable Card Component"
layout: "post"
date: "2021-1032-27T22:02:06.006Z"
summary: "I had a need to build a reusable card component for a project I'm working on. I will show you how I did it."
hero: "/blog_heros/circuits.jpg"
hero_alt: "illuminated circuit board"
tags: ["reusable component", "javascript", "react"]
---

## The Requirement

I have been working on a freelance project and am knew I would be utilizing cards quite heavily in the build. There are plenty of frameworks on NPM that you could utilize for creating cards. I did not want to install any excess packages so I built my own.

### The Setup

I started with your basic create-react-app.

```sh
yarn create react-app ./
```

After the installation of the packages required, I started the dev server and went to work.

The very first thing I did was created 2 new files one called card.js and the second called card.css. These files will hold the basic information for the card.

### The Card Component

I created a functional component.

```jsx
import "./card.css";

const Card = props => {
  console.log(props);
  return <div className="card">Test card for styling</div>;
};

export default Card;
```

I knew I wanted to be able to pass other components into the component so to verify how they came through, I did a console.log on props.

I received the following output in my console.

```sh
{children: "test"}
children: "test"
```

I then saw there was a property of 'children' that I could destructure out and that should have all of the components passed. With that in mind I made the following change to the card component:

```jsx
import "./card.css";

const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
```

### Styling the card

In the card.css file, I needed to style the component as it went in. after some trial and error, I found the below to be what I wanted to have as the styling.

```css
.card {
  text-align: center;
  overflow: scroll;
  width: 45%;
  height: 50%;
  background: #c4c4c4;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  margin-bottom: 20px;
  margin-top: 20px;
  padding: 0 5px;
}
```

This gave me a basic reusable card. I did later on override some of the fields depending on what I needed from other page styling by targeting the parent > .card relationship and making any changes there. I'm not going to go deep into that as this is just to build a reusable card component.

### Adding the card to the parent page:

I then imported the card and began using it.

```jsx
import "./styles.css";
import Card from "./card";

export default function App() {
  return (
    <>
      <div className="App">
        <Card>
          <h1>Hello CodeSandbox</h1>
          <h2>Bring the impossible to life!</h2>
        </Card>
      </div>
      <div className="card2">
        <Card>
          <p>
            This is an awesome approach to building a reusable card that will
            give you a reusable component.
          </p>
        </Card>
      </div>
    </>
  );
}
```

And that was it. You can view a working example of this card over on [CodeSandbox](https://codesandbox.io/s/dry-fast-y2g2r5?file=/src/App.js:0-498). I love using CodeSandbox for any prototyping or testing out ideas to make sure things work as I expected them to.

I hope that this has helped you in your journey to learn and implement what you need.

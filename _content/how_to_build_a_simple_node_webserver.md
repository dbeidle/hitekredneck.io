---
title: "How to build a simple Node Webserver"
layout: "post"
date: "2022-06-19T11:27:51.416Z"
summary: "I walk you through building a Node JS server with Express to serve up a simple website with static assets. "
hero: "/blog_heros/datastream.jpg"
hero_alt: "Data Streams"
tags: ["node", "javascript", "express", "server", "yarn", "morgan", "dotenv"]
---

## Building a Node Webserver

Have you ever wanted to build a quick and easy webserver to play with your html,css, and javascript skills? I have and I built a very simple Node webserver with express and javascript.

### Create your project directory

I am using a Mac so the outputs and commands you see below are tailored towards it and the comnand line interface (cli). You can just as easily do most of the below in your operating system and your preferred IDE (sublime, atom, or vscode).

The first step is to create a folder on your system to hold your project. I am using a directory called test_server. I prefer to use yarn as my package manager instead of npm but this is all up to your choice. If you don't have yarn installed you can install it from [yarnpkg.com](https://yarnpkg.com/). If you prefer to use npm I will provide you with the basics to get a project up and running.

### Initialize the project

Next, we will want to initialize the project in your folder. For this, you will use `npm init` or `yarn init` and accept all the defaults. You should end up with some output like the below in your terminal/cmd prompt.

```sh
dave:test_server/ $ yarn init
yarn init v1.22.17
question name (test_server):
question version (1.0.0):
question description:
question entry point (index.js):
question repository url:
question author:
question license (MIT):
question private:
success Saved package.json
✨  Done in 31.57s.
dave:test_server/ $
```

When you list the files in the directory `ls -la` (Mac and Linux) or `dir /w` (windows), you should now see a package.json file in your directory.

```sh
dave:test_server/ $ ls -la
total 8
drwxr-xr-x   3 dave  staff    96 Jun 18 11:12 .
drwx------@ 36 dave  staff  1152 Jun 18 11:12 ..
-rw-r--r--   1 dave  staff    92 Jun 18 11:05 package.json
dave:test_server/ $
```

### The package.json file

When you look at the package.json file, you will see a few lines of code added in. These are the defaults that you added in above step.

```sh
dave:test_server/ $ cat package.json
{
  "name": "test_server",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
dave:test_server/ $
```

This is a good starting point and this can be used as it sits but I will edit mine to change the "main" file to reflect that I want it to be server.js which we have not yet added. You don't have to do this but it is my preferred way of doing things.

```sh
dave:test_server/ $ cat package.json
{
  "name": "test_server",
  "version": "1.0.0",
  "main": "server.js",
  "license": "MIT"
}
dave:test_server/ $
```

### Installing NPM Packages

Next we will start with installing the packages we will use for this server. I perfer to use yarn but if you use npm just use `npm install` instead of `yarn add` from the below line. I will go over these packages later as we add them into the project.

```
yarn add express morgan dotenv nodemon
```

Once you have done that you will then see those entries in your package.json file and a new directory called node_modules as well as a package.lock (npm) or yarn.lock (yarn). We wont't be modifying naything within the lock files or in the node_modules directory but we will need to create a .gitignore file to not copy those files over to your repository if you choose to do so. I will not be pushing this to git but will show you my basic .gitignore for these types of things.

```sh
dave:test_server/ $ ls -la
total 128
drwxr-xr-x    6 dave  staff    192 Jun 18 11:27 .
drwx------@  35 dave  staff   1120 Jun 18 11:26 ..
drwxr-xr-x  170 dave  staff   5440 Jun 18 11:27 node_modules
-rw-r--r--    1 dave  staff    249 Jun 18 11:27 package.json
-rw-r--r--    1 dave  staff    377 Jun 18 11:04 server.js
-rw-r--r--    1 dave  staff  53950 Jun 18 11:27 yarn.lock
dave:test_server/ $
```

Create your .gitignore file and add the following information to it. This should be generic enough for all OS's to utilize.

```gitignore

# Logs
logs
*.log
npm-debug.log*

# Dependency directories
node_modules
package.lock
yarn.lock

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Environment Variables
.env

# RSS Feed file
**/*.xml%

# OS specific files that don't need to be saved to git
# Mac
**/*.DS_Store
# Windows
**/thumbs.db

```

Now that we have that out of the way, it's time to dive on in and get started coding.

### Coding Time! Creating your server

The next step in the process is to create a file called server.js and require in express and start configuring it for serving our data.

```js
const express = require("express");

// Initialize Server
const app = express();

// Create a route handler for the root of your system
app.get("/", (req, res) => {
  res.send("Hello World! \r\n");
});
// Tell the app what port you want to use
const port = 8080;

// Start server listening on the port set above
app.listen(port, () => {
  console.log("API listening on " + port);
});
```

Once that is done, if you type `node server.js` in your command line, you will see the below pop up.

```
dave:test_server/ $ node server.js
API listening on 8080


```

Do take note that you will not have a command line to enter any information into any longer in this window. If you don't see something similar to the above or you see an error, go back and see if you missed any steps. Don't close this window. If you do your server will stop working as a result of the terminal no longer being available.

On Mac or Linux, you can test the server with `curl http://localhost:8080` or open http://localhost:8080 in a web browser. For windows, just use a web browser to open the page. You should see the text we added into the res.send function in the route handler we created in our server.

```
dave:test_server/ $ curl http://localhost:8080
Hello World!
dave:test_server/ $
```

### Success!

You now have a successfully running server running on node. Let's not stop here though. We want a little more functionality out of this server.

### Node Mon

Since we will be building and modifying our code further and we don't want to have to ctrl-c to kill the server and restart it each time we make a change, we will utilize nodemon and create a 'script' in our package.json to easily run things. We installed the nodemon package earlier so this should be good to go. If you did not install it then please do so now. Edit your package.json file to have a scripts line within it.

```json
{
  "name": "test_server",
  "version": "1.0.0",
  "main": "server.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "body-parser": "^1.20.0",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.16"
  }
}
```

Ensure you have trailing commas where they are needed. You can now test that the scripts are running properly by using `yarn start` and `yarn dev` if you are using yarn and if you are using npm `npm run start` and `npm run dev`.

```
dave:test_server/ $ yarn start
yarn run v1.22.17
$ node server.js
API listening on 8080
^C
dave:test_server/ $ yarn dev
yarn run v1.22.17
$ nodemon server.js
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
API listening on 8080


```

### Logging

I prefer to have more information provided to me by the server in regard to logging so I like to use morgan to give more verbose logging information. In our server.js file, lets add in morgan to raise the logging level. We will be adding 3 lines to the server.js file. We will need to require morgan into the file and tell the server to utilize morgan. I prefer to use the combined logging level but there are others you can choose from by reading the documentation in their github [README.md](https://github.com/expressjs/morgan#readme).

```js
const express = require("express");
const morgan = require("morgan");

// Initialize Server
const app = express();

// Use morgan for logging
app.use(morgan("combined"));

// Create a route handler for the root of your system
app.get("/", (req, res) => {
  res.send("Hello World! \r\n");
});
// Tell the app what port you want to use
const port = 8080;

// Start server listening on the port set above
app.listen(port, () => {
  console.log("API listening on " + port);
});
```

If you are using nodemon via the `yarn dev` command, you will see the following output to your screen if it's working properly. If you see an error, make sure your file looks like mine above.

```sh
dave:test_server/ $ yarn dev
yarn run v1.22.17
$ nodemon server.js
[nodemon] 2.0.16
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
API listening on 8080
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
API listening on 8080

```

Now when you test via curl or browser, you will see an output in your terminal that looks like the below. What the information is telling you is the source address that you came from in our case it's 127.0.0.1 which is the localhost address. You also see the date & time of the request the method used ("GET"), the http version the request is utilizing ("1.1), the status code (200), and the user agent being utlized ("curl/7/79/1").

```sh
::ffff:127.0.0.1 - - [18/Jun/2022:17:24:43 +0000] "GET / HTTP/1.1" 200 15 "-" "curl/7.79.1"

```

Next I want to show you what you see when you are not using a route configured on the server. In this example, you can see that I tried to go to `http://localhost:8080/notfound`. Since we do not have a route for /notfound, the server responded with status code 404 which indicates the page is not found. You can also see more information relating to me using the Chrome webbrowser to navigate to the url. All of this information can be useful if you have a report of something not working, you can see exactly what the user requested and the basics of their system they are using to assist you in debugging.

```sh
::1 - - [18/Jun/2022:17:33:10 +0000] "GET /notfound HTTP/1.1" 404 147 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
```

### Environment Variables

I would be remiss if I didn't at least touch on Environment Variables. These are variables that you set in a `.env` file and consume them into the server to be used. If you are working with an API or Database, you will want to protect your API keys or Database credentials from being uploaded to github or being exposed in your codebase. Once the credentials are in the version control system, you will have to change the credentials or request a new API key so to keep this information secure, let's create the `.env` file and put the following two lines into it.

```js
NODE_ENV = "Development";
PORT = "8000";
```

If you look back at the `.gitignore` file that we created earlier you will see the `.env` file is already included in that file.

Now we need to consume the file into our server and we will use the `dotenv` package we installed at the beginning. If you did not do that step, please do so now. We will also be adding a few of lines to our server.js file. Require the `dotenv` package with the config function. I added an if statement to only provide the verbose logging if the NODE_ENV is set to "Production" and I changed the line for the port to look for the PORT variable from the `.env` file and use it if it's present otherwise default to 8080.

```js
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// Initialize Request
const app = express();

// Use morgan for logging if we are in production
if (process.env.NODE_ENV === "Production") {
  app.use(morgan("combined"));
}

// Create a route handler for the root of your system
app.get("/", (req, res) => {
  res.send("Hello World! \r\n");
});
// Tell the app what port you want to use
const port = process.env.PORT || 8080;

// Start server listening on the port set above
app.listen(port, () => {
  console.log("API listening on " + port);
});
```

When you save the file, your terminal that you are running your server in should look like this. Note that if you were to attempt to refresh your existing browser window, it will no longer responde to you as we modified the port it is listening on to pull from the .env file which is configured for port 8000.

```sh
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
API listening on 8080
::ffff:127.0.0.1 - - [18/Jun/2022:17:24:43 +0000] "GET / HTTP/1.1" 200 15 "-" "curl/7.79.1"
::1 - - [18/Jun/2022:17:33:10 +0000] "GET /notfound HTTP/1.1" 404 147 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
API listening on 8000

```

### Serving Static Files

We will now embark on the next step of this tutorial which is to serve static files from your server instance. This will be your `index.html`, `styles.css`, and `scripts.js` files that we will create in the next few steps. Create a folder called public and put the following files inside that folder.

#### index.html

```html
<<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="/styles.css" />
    <title>My Express Server App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div class="hello">
      <div class="world">
        <h1>Hello World!</h1>
        <p>You are now entering the Dev Zone!</p>
      </div>
    </div>
    <script src="/scripts.js"></script>
  </body>
</html>
```

#### styles.css

```css
body {
  background-color: #0081a7;
  color: #fdfcdc;
}
h1 {
  display: block;
  color: #fed9b7;
}
p {
  display: block;
}
.hello {
  display: flex;
  margin: auto;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
}
.world {
  text-align: center;
}
```

#### scripts.js

```js
alert("Hello There!");
```

Now back in your `server.js` file, we will modify it so that it serves the index.html file as well as the other two files properly on load. add `app.use(express.static("public"))` above our root app.get("/") function and modify the app.get("/") function to now send the index.html file.

```js
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

// Initialize Request
const app = express();

// Use morgan for logging if we are in production
if (process.env.NODE_ENV === "Production") {
  app.use(morgan("combined"));
}

// Serve static files from /public directory
app.use(express.static("public"));

// Create a route handler for the root of your system
app.get("/", (req, res) => {
  res.sendfile("public/index.html");
});

// Tell the app what port you want to use
const port = process.env.PORT || 8080;

// Start server listening on the port set above
app.listen(port, () => {
  console.log("API listening on " + port);
});
```

### Conclusion

And there you have it. A fully functioning NodeJS server that is giving you not only the index.html but the styles.css and script.js. In the next blog, I will expand on this basic framework to allow you to have CRUD operations to/from the server.

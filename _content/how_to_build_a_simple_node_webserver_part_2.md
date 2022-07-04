---
title: "How to build a simple Node Webserver part 2"
layout: "post"
date: "2022-07-04T23:38:21.747Z"
summary: "We take a walk on the far side of Javascript by creating a CRUD Todo Application in Vanilla Javascript. "
hero: "/blog_heros/fiber-optics.jpg"
hero_alt: "Fiber optic cables blue light"
tags: ["node", "javascript", "express", "server", "crud", "api"]
---


## How to build a simple Node Webserver Part 2 - Adding CRUD operations.

## Adding CRUD operations to our simple Node Webserver

### Step back in time for a recap

If you haven't already, please checkout Part 1 of this [series](https://hitekredneck.io/blog/how_to_build_a_simple_node_webserver). In Part 1 we built a basic node webserver that serves index.htnl, styles.css, and scripts.js files. In this post, we will utilize some basic Create, Read, Update, and Delete operations on the server.  I will not be diving into database integration in this post. I will instead show you how to utilize JSON files to read and update the data we are going to use.  

### Before we start

We need to add 1 more new package to the project. We will need the `body-parser` package for steps later in this tutorial. You should install it now via `yarn add body-parser` or `npm install body-parser`. While not required for this turorial, I would also advise on downloading and familiarizing yourself with a tool called [Postman](https://www.postman.com/). I use this for quickly testing API endpoints when I am creating them. As a developer, this tool will be a great addition to your toolbox.

### Start the dev server

Let's start the dev server back up.  In a terminal cd into the directory you have your package.json file in and type `yarn dev` or `npm run dev` depending on which environment you used from Part 1.  Once you have the dev server up and running you can then browse to https://localhost:8000 on your browser and you should see the page as we left it. 

### Just a small warning

For the data operations on the API side of this work, we will be utilizing the `fs` and `path` modules that are part of the node native modules. I would suggest you read up on these modules. You can read more about these on the Node Dev website ([fs](https://nodejs.dev/learn/the-nodejs-fs-module), [path](https://nodejs.org/api/path.html)). The only reason I am calling out this module is because we will be reading and writing files on your computer through Javascript.  While what we are doing is very minimal and should have no risk of side-effects, I feel the need to give you a warning since if you type something wrong, you could possibly cause damage to your computer. I am currently running this on my local machine though with no issues so you should be good.  


### Create new directory and files

From the root directory of your project, create a directory called `api` and in this directory create 2 files named `api.js` and `data.json`. The api.js file will hold our route handler for anything that comes into the server with `/api`. The `data.json` file will hold the data that will be displayed. **note: You can perform this action from the original `server.js` file we created earlier. I prefer to keep these separate.**


### Add placeholder data.

In the `data.json` file, let's prepopulate some data in there. For the purpose of this walk-through, we will utilize the normal todo list. Copy the below information and save it in the `data.json` file.

```json
[
  {
    "todo": "Finish the tutorial",
    "todoDate": "2022-07-03T19:26:00.000Z",
    "completed": false,
    "id": "053b641115ec93ac33d2dc38ab81ecb7"
  }
]
```

### Reading the todo list

Now in the `api.js` file we will want to add the following code for testing. First we are requiring in the `fs` and `path` packages. These are standard packages included with Node so we do not have to install them. Next we will create the base function and immediately export it. While we could name the function and then export it at the bottom, I prefer this method. The `app` that is within this arrow function will connect back to the `app` that we created in the  `server.js` file from the last post. Since we are passing the `app` into this file as a parameter, we are able to use all of the methods that were associated with it.  We will use the get method to pull the information from the file and return that information back to the requesting server.  

```js
const fs = require("fs");
const path = require("path");

module.exports = app => {
  app.get("/api/todos", async (req, res) => {
    const found = JSON.parse(
      fs.readFileSync(path.join(__dirname, "data.json"))
    );

    if (!found) {
      return res.status(404).send("data not found");
    }

    res.send(found);
  });
};
```

Let's jump back over to our `server.js` file and make use of this data. We will add `require("./api/api")(app);` in the file just below our root route. We will also add in the `body-parser` package here so we can utilize it. At the top of the file, add `const bodyParser = require("body-parser")`. Right under where we initialize the request 

```js
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser")
require("dotenv").config();

// Initialize Request
const app = express();

// Tell the app to use body-parser for json
app.use(bodyParser.json());

// Use morgan for logging if we are in production
if (process.env.NODE_ENV === "Production"){
app.use(morgan("combined"));
}

// Serve static files from /public directory
app.use(express.static("public"));

// Create a route handler for the root of your system
app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

// Import Route Handlesrs and pass the app down to it
require("./api/api")(app);

// Tell the app what port you want to use
const port = process.env.PORT || 8080;

// Start server listening on the port set above
app.listen(port, () => {
  console.log("API listening on " + port);
});
```

Once this information is added into the `server.js` and the file is saved. You should now be able to open a new tab in your browser and connect to `http://localhost:8000/api/todos` and you should now see the data that we added to the `data.json` file earlier. If not, then please look through and make sure your code looks like my examples above. If you see the data, then you have now successfully completed the Read operation of CRUD.

Let's display this data to the DOM in the browser. We will start with adding a new div within our html to be the home for this data. I will place it below the div with the class "world". I am also changing the div classes by replacing the class "hello" with "parent" and the class "world" with "devzone". I have also added another div inside of the "devzone" div to hold our inputs for adding a new item as well as a button to submit the data. We will style this later in the tutorial.  

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="/styles.css" />
    <title>My Express Server App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div class="container">
      <div class="devzone">
        <h1>You are now entering the Dev Zone!</h1>
        <p>What do you need to work on today?</p>
        <div class="addnew">
          <label for="todo">Todo:</label>
          <input id="todo" type="text" />
          <label for="duedate">Due Date:</label>
          <input id="duedate" type="datetime-local" />
          <button id="submit" class="submit-btn">SUBMIT</button>
        </div>
      </div>
    </div>
    <script src="/scripts.js"></script>
  </body>
</html>
```

Let's now update the styles.css file to reflect the updated class names for the existing components. 

```css
body {
  background-color: #0081A7;
  color: #FDFCDC;
}
h1 {
  display: block;
  color: #FED9B7;
}
p {
  display: block;
}
.container {
  display: flex;
  margin: auto;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
}
.devzone {
  text-align: center;
}
```

### Creating an entry

Now that we can query the data from our document and see that output to our browser, we will work on the Create method of CRUD. Within our `api.js` file, let's add a new route but for this one we will use the Post method to add a new Todo to the list. We will start with importing the crypto package `const crypto = require("crypto")`. While we are not doing any authentication, we will use this for calculating the `id` for each new Todo. This will mimic a database in that you should always have an id assoiated with any entry in a database. Next we will pop out the filename from the `fs.readFileSync` function calls and make it into a variable called `fileName`. This is being done for the DRY principal (Don't Repeat Yourself). 

```js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = app => {
  const fileName = path.join(__dirname, "data.json");
  app.get("/api/todos", async (req, res) => {
    const found = JSON.parse(fs.readFileSync(fileName));

    if (!found) {
      return res.status(404).send("data not found");
    }

    res.send(found);
  });

  app.post("/api/todos", async (req, res) => {
    const data = req.body;

    if (!data.todo || !data.todoDate) {
      return res.status(400).send("Bad Request");
    }

    data.completed = false;

    let hash = crypto
      .createHash("md5")
      .update(JSON.stringify(data))
      .digest("hex");

    data.id = hash;

    const update = await JSON.parse(fs.readFileSync(fileName));

    update.push(data);

    fs.writeFileSync(fileName, JSON.stringify(update));

    res.send(update);
  });
};

```

### Updating an entry

At this point, We have done the Create & Read portions of CRUD. We will now begin focusing on the Update method. For this application, we are going to have the todo change to a strike-through style when you mark an item as complete. We will also update the the todo in our JSON file to flip the conpleted flag to `true`.  To do this we are going to use Patch http method. 

In the `api.js` file just below the entry we just made, we will make a new one for updating the entry. From the front end, we will be sending `id` and `completed`  for the item we want to modify to the back end server within the request body. We are going to use a for loop to look for the item we want to modify by checking if the `id` of the current item in the loop is equal to the `data.id` that we sent to the server. We then just set the completed attribute for that todo. The method I am showing you here will allow you to reverse the change if you clicked it accidentally. 

```js
app.patch("/api/todos", async (req, res) => {
    const data = req.body;
    if (!data.id || !data.hasOwnProperty("completed")) {
      return res.status(400).send("Bad Request");
    }
    const todos = await JSON.parse(fs.readFileSync(fileName));
    for (i = 0; i < todos.length; i++) {
      if (todos[i].id === data.id) {
        todos[i].completed = data.completed;
      }
    }
    fs.writeFileSync(fileName, JSON.stringify(todos));
    res.status(200).send(todos);
  });
```


### Deleting an entry

The last part of our CRUD methods is to delete an entry. For this we will use the delete http method. The only data we will send to the API is the id of the entry we want to delete. We will just simply use the `array.filter` method from javascript to keep items that do not match the id we are sending to the API. We then write the filtered array to the file and also send the new filtered array back to the App. 

```js
  app.delete("/api/todos", async (req, res) => {
    const data = req.body;

    if (!data.id) {
      return res.status(400).send("Bad Request");
    }
    const todos = await JSON.parse(fs.readFileSync(fileName));
    const filtered = todos.filter(e => e.id !== data.id);

    fs.writeFileSync(fileName, JSON.stringify(filtered));
    res.status(200).send(filtered);
  });
  ```

### What's next?

Now that we have implemented CRUD in the API server, we need to turn our focus back towards the front end webpage. We need to make some adjustments to the javascript, html, and css so that we can display the information on the page and make use of all the CRUD methodology.


### Displaying Todos

So far in this tutorial we have focused on the Back-End side. We are now going to work on the Front-End Javascript. Let's add a little boilerplate to the `index.html` file. Right underneath the closing tag for `<div class="addnew">`, we are going to add a parent div for all elements to be placed into. Then we create an unordered list and a list item with divs associated to headings that are going to be above our todo list items. 

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="/styles.css" />
    <title>My Express Server App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div class="container">
      <div class="devzone">
        <h1>You are now entering the Dev Zone!</h1>
        <p>What do you need to work on today?</p>
        <div class="addnew">
          <label for="todo">Todo:</label>
          <input id="todo" type="text" placeholder="Add a Todo" />
          <label for="duedate">Due Date:</label>
          <input id="duedate" type="datetime-local" />
          <button id="submit" class="submit-btn">SUBMIT</button>
        </div>
        <div id="todos">
          <ul class="todo-parent" id="todo-list">
            <li class="todo-headers">
            <div>Task:</div>
            <div>Due Date:</div>
            <div class="trash"></div>
            </li>
          </ul>
          </div>
        </div>
      </div>
    </div>
    <script src="/scripts.js"></script>
  </body>
</html>
```

Next we need to add a couple of methods to the `scripts.js` file to query our API and build out the todo list. Just below our input and button click listeners,  we are going to add in a function called `dateToISOLocal` that we will use in a conditional to highlight overdue items.

```js
const dateToISOLocal = d => {
  var z = n => ("0" + n).slice(-2);
  var off = d.getTimezoneOffset();
  off = Math.abs(off);

  return (
    d.getFullYear() +
    "-" +
    z(d.getMonth() + 1) +
    "-" +
    z(d.getDate()) +
    "T" +
    z(d.getHours()) +
    ":" +
    z(d.getMinutes())
  );
};
```

I personally have a specific format that I like to see my dates in when displayed in the DOM. We will add this function just below the `dateToISOLocal`.

```js
const parseDate = date => {
  // Convert the date string to the locale string and output it as a string
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dt = new Date(date).toLocaleString();
  const month = months[new Date(dt).getMonth()];
  const day = new Date(dt).getDate();
  const year = new Date(dt).getFullYear();
  const hr = new Date(dt).getHours();
  const min = new Date(dt).getMinutes();
  const minutes = min >= 10 ? min : "0" + min;

  // Return the date as a string
  return `${day} ${month} ${year} ${hr}:${minutes}`;
};
```

Now we just after the last piece of code we should add in our call to the back-end to get the data and display it in the DOM along with a couple of icons to mark items as completed and to completely delete the item and then immediately call this function. I have a couple of svg files I downloaded and stored in the public directory for when you want to mark an item as completed or just delete it.  I found them randomly on google images. You will need to have them accessible to your code for this portion and adding a new todo which we will implement in a bit.

```js
const getHtml = async () => {
  const response = await fetch("http://localhost:8000/api/todos");
  const todos = await response.json();

  if (response.status !== 200) {
    console.log(
      `The server responded with ${response.status} and ${response.statusText}`
    );
    return;
  }
  let parent = document.getElementById("todo-list");

  todos.forEach(item => {
    let li = document.createElement("li");
    li.setAttribute("id", item.id);
    if (item.todoDate < dateToISOLocal(new Date())) {
      li.classList.add("overdue");
    }
    li.innerHTML += `
    
      
        <div>${item.todo}</div>
         <div>${parseDate(item.todoDate)}</div>
         <div class="check" title="Mark Complete" id=${item.id + "check"}
         ><img src="check.svg" alt="item completed button"></div>
         <div class="trash" title="Delete Item"id=${
           item.id + "trash"
         }><img src="trash.svg" alt="delete item"/></div>`;

    parent.appendChild(li);
    document
      .getElementById(item.id + "check")
      .addEventListener("click", () => markCompleted(item.id));
    document
      .getElementById(item.id + "trash")
      .addEventListener("click", () => deleteTodo(item.id));
  });
};

getHtml();
```

After you save the file and refresh your browser window you should see any todo's that were created during testing if you used Postman to test the back-end methods and our original data placeholder. 

### Adding a new Todo Item via the inputs

Right now, if you filled in the items in the form to add a todo, you would not see any change in neither the JSON file that holds our data nor in the DOM. Let's fix that by adding a few handlers into the mix. First we will add in a line to pre-populate the date menu with the current time of when you last refreshed the page. 

```js
document.getElementById("duedate").value = dateToISOLocal(new Date())

```

The reasoning behind this line is if you just want to fill in a todo and not give a date/time for it to be completed by, the current date/time will be populated and as such you will see the item reflecting as being overdue. This is quicker for testing but you may want to just have this populated with the current date/time and have the back-end validate that the new item is for a date/time in the future. I will not be adding this functionality. 

The next thing we are going to add in is functionality to fill out a couple of variables that will be needed during the submit function. Under the previous line in `scripts.js`, place the following variables and event listeners. 

```js
let todo = "";
let todoDate = "";

document
  .getElementById("todo")
  .addEventListener("input", e => (todo = e.target.value));

document
  .getElementById("duedate")
  .addEventListener(
    "input",
    e => (todoDate = new Date(e.target.value).toISOString())
  );

```

Now, to handle when a user clicks the submit button, we will need one more event listener and a handleSubmit function. This will go just below the event handlers we just added in in the previous code block.  What this code is doing is taking the information that was put into the variables by typing in the todo input and adding in a date in the date/time input. We then send that information to the API via the POST method we implemented earlier. The back-end will take the data we passed and add it to the JSON file and return just the single item we passed down but with an `id` object now attached. Due to the way we coded this earlier, this `id` will be unique to this item and only if you exactly duplicate the information from the todo field and the date/time field. We then inject the html for this todo into the DOM all within this function.

```js
const handleSubmit = async (todo, todoDate) => {
  if (todoDate === "") {
    todoDate = toISOLocal(new Date());
  }
  const response = await fetch("http://localhost:8000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo, todoDate }),
  });
  const data = await response.json();
  const parent = document.getElementById("todo-list");
  if (response.status === 200) {
    let li = document.createElement("li");
    li.setAttribute("id", data.id);
    li.innerHTML += `
  
    
      <div>${data.todo}</div>
       <div>${parseDate(data.todoDate)}</div>
       <div class="check" title="Mark Complete" id=${data.id + "check"}
       ><img src="check.svg" alt="item completed button"></div>
       <div class="trash" title="Delete Item"id=${
         data.id + "trash"
       }><img src="trash.svg" alt="delete item"/></div>`;

    parent.appendChild(li);
  }
};
```

### Marking a Todo as Completed

I opted to put this in in case you are one of those people who like to see a record of what you have done so instead of just deleting the todo, we are going to add a completed class to the class list to turn the text to strike-through. This will also make a call to the API route with the PATCH method to update the `completed` object attached to the todo. It will only add the class to the class list if the API returns a `200` status code.  Let's add that function to the bottom of the `scripts.js` file now. 

```js
const markCompleted = async id => {
  const response = await fetch("http://localhost:8000/api/todos", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (response.status === 200) {
    const complete = document.getElementById(id).classList;

    complete.toggle("completed");
  }
};
```

### Deleting a Todo

The last thing we need to implement for our CRUD operations is the DELETE method. In the function we are going to create for this method, we are going to call the API with the DELETE method and pass it the `id` of the todo we want to delete. Just like with the previous function, we will not do anything on the front end unless we get that `200` status code indicating that it was removed from our JSON file and then we will simply remove it from the DOM. 

```js
const deleteTodo = async id => {
  const response = await fetch("http://localhost:8000/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (response.status === 200) {
    let del = document.getElementById(id);
    del.remove();
  }
};
```



### Adding the CSS to Style the page

The last thing we have left to do is to update our CSS for the elements we are dealing with. I'm going to assume that you understand the basics of CSS so I won't go into detail about it here. Replace everything in your `styles.css` with the below CSS code.

```css
body {
  background-color: #0081A7;
  color: #FDFCDC;
}
h1 {
  display: block;
  color: #FED9B7;
}
p {
  display: block;
}
label {
  font-size: 20px;
}
input {
  border: 1px solid black;
  border-radius: 5px;
  height: 25px
}
.container {
  display: flex;
  margin: auto;
  padding-top: 50px;
  align-items: center;
  justify-content: center;
}
.devzone {
  text-align: center;
}

.submit-btn {
  background: #FED9B7;
  border-radius: 10px;
  width: 100px;
  height: 25px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px rgba(255, 255, 255, .5);
}

#todos {
  margin-top: 45px;
  width: 100%
}

.todo-parent {
  list-style: none;
}
.todo-headers {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

#todo-list li {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

#todo-list li div {
  width: 40%;
  text-align: left;
}

#todo-list li .check {
  align-content: flex-end;
  width: 10%;
  filter: invert(99%) sepia(2%) saturate(2626%) hue-rotate(344deg) brightness(97%) contrast(105%);
  cursor: pointer;
}
#todo-list li .check:hover {
  filter: invert(55%) sepia(82%) saturate(443%) hue-rotate(83deg) brightness(100%) contrast(89%);
}
#todo-list li .trash {
  align-content: flex-end;
  width: 10%;
  filter: invert(99%) sepia(2%) saturate(2626%) hue-rotate(344deg) brightness(97%) contrast(105%);
  cursor: pointer;
}
#todo-list li .trash:hover {
  filter: invert(17%) sepia(62%) saturate(7474%) hue-rotate(357deg) brightness(101%) contrast(117%);

}
.check img {
  height: 20px;
  width: auto;
}
.trash img {
  height: 20px;
  width: auto;
}

.overdue {
  border: 1px solid red;
  border-radius: 5px;
  background: red
}
.overdue .trash:hover {
  filter: invert(0%) sepia(4%) saturate(0%) hue-rotate(337deg) brightness(100%) contrast(107%);
}

.completed {
  text-decoration: line-through;
}
``` 

### Conclusion

We now have a fully styled CRUD application written completely in Vanilla Javascript. I do hope you found this two part blog post as helpful and inciteful. 

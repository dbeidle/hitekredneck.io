---
title: "Building a Flask Server"
layout: "post"
date: "2022-04-29T01:44:35.036Z"
summary: "I wanted to test out Flask on Python for creating a simple web server. It was easier in than I had imagined."
hero: "/blog_heros/python.jpg"
hero_alt: "Torii Gate"
tags: ["python", "flask", "html", "pycharm"]
---

### The Requirement:

I was doing a little exploring around in Python and wanted to build out a simple webpage and serve it from a Flask server to explore how it works.

## Python & IDE Choice:

If you don't already have it installed, I would highly suggest downloading [Python](https://www.python.org/downloads/) and installing it. You can work with Python in [VS-Code](https://code.visualstudio.com/download) but I prefer to do my Python development with [PyCharm](https://www.jetbrains.com/pycharm/download/) Community Edition. You can also use vi, or any text editor to create your files. This part is really up to you but I would suggest giving Pycharm a shot.

## Installing Packages:

You can find a multitude of articles out there for how to install a Python package. I use pip which comes bundled with Python. We only need to install one package for this build so open a terminal window and type the following:
`pip install Flask`

## The Build:

Create a folder on your computer and create a blank file called main.py. In the same folder, create a file called `templates` and another called `static `.

Open the main.py file and let's start building. We will start by importing Flask into the file.

```py
from flask import Flask

```

The next step is to build out the rest of the flask app with a route so that when you run the server it gives you content. so in your main.py file, let's instantiate the Flask instance and create a basic route to return "Hello World".

```py
from flask import Flask,
app = Flask(__name__)


@app.route('/')
def home():
    return 'Hello, World! <br> Welcome to your first Flask App...'


if __name__ == "__main__":
    app.run()
```

Now that we have that built, save the file and run it. You should see the following output in your console and be able to browse to `http://127.0.0.1:5000` and see your newly created Hello World page.

```
* Serving Flask app "main" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

## Creating Content:

The next step in finishing a true http server is to provide some data and have that data served. Go into the templates folder and create an index.html file. In that file place the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Flask App</title>
  </head>
  <body>
    <h1>{{ message }}</h1>
    <img
      src="https://media.giphy.com/media/ctJ8xD3fyTXXo7kckU/giphy.gif"
      alt="Midnight Cowboys: I'm Walkin Here"
    />
  </body>
</html>
```

Now we need to make a change to the main.py file so that it will send that page over to the web browser.

In your main.py file, make the following changes, we are going to import the rendertemplate method from Flask and tell flask to serve the index.html. Optionally, we can pass variables like the message variable that will be available to the template.

```py
from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html", message="Hey! I'm workin' here!")


if __name__ == "__main__":
```

Now when you re-run the main.py file, You should see the content that we put into the index.html file along with the message in the render_template function when you browse to the URL.

## What about the static directory?

Remember that static directory we created earlier? Use this folder to reference any client side info that you will be serving with your index.html. This could be images or css or even javacript. The static folder is where Flask will look for these specific files. If you wanted to add styles to your page you would add a styles.css file and then link to it in your page via the static directory eg: `<link rel="stylesheet" href="static/assets/css/main.css" />`. You would do the same for any static image or icon.

## That's it...

You now have a fully functioning Python Flask server running. You can create html pages and serve them via the templates. You can also style your html page as you see fit.

Happy Coding!

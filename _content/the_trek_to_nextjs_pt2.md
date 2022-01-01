---
title: "The Trek to NextJS pt2"
layout: "post"
date: "2022-01-01T15:27:20.657Z"
summary: "I had a few issues getting the blog portion to work properly. I explain more in detail"
hero: "/blog_heros/fuji-sakura.jpg"
hero_alt: "Mount Fuji with Cherry Blossom Tree"
tags: ["next", "javascript", "react", "tailwindcss", "blog", "MDX", "Markdown"]
---

## MDX Headaches...

This is a continuation on my trek to rebuilding my site into a NextJS site [Part 1 is here...](https://hitekredneck.io/blog/the_trek_to_nextjs_part_1)

I wanted to make sure I had my blog portion down and ready to go but I did not expect it to be quite so difficult to work with. Getting the main page and the slug working was easy as pie. Getting the code to work with `next-mdx-remote` wasn't quite so easy. I looked up quite a few tutorials online and could not get it to work as it was described. It was starting to irk me and it took me a full day of looking through documentation and online articles and even Youtube videos.

The issue that I came to find out is that all the recent posts and the like I had been reading about were all for the previous version. Even the posts from just after the new release were on the previous version and the documentation was not clear on one major breaking change. I was having an issue getting the acutal post to show up in the slug page. I won't go into detail on the `tailwindcss` classes I used but they are here for your reference. Start by adding the following packages:

```
yarn add next-mdx-remote grey-matter
```

In your pages directory, create a new 'blog' directory and in there add an index.js and [slug].js

```
cd pages
mkdir blog
touch blog/index.js && touch blog/[slug].js
```

### Index.js page:

Starting with the index.js page, import in the packages needed.

```jsx
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "../../lib/data";
import { shimmer, toBase64 } from "../../lib/blur";
import getDate from "../../lib/getDate";
```

Next you will need to create the main component of the page. What I found I love most about the latest version of React is you don't need to import React into your components. You also don't need to provide a function name on your default export.

```jsx
export default ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" w-5/6 m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 md:gap-8 mt-20 md:my-auto">
        {posts.map(item => (
          <BlogListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  );
};
```

In that same file, I added 2 other functions to finish up the general blog posts list and have it shown. The first was the getStaticProps caller. What we are doing here is sorting all items by date and returning them with a specific format that I wanted to use.

```jsx
export async function getStaticProps() {
  const allPosts = getAllPosts();
  const allPostsSorted = allPosts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
  return {
    props: {
      posts: allPostsSorted.map(({ data, content, slug }) => ({
        ...data,
        date: getDate(data.date),
        content,
        slug,
      })),
    },
  };
}
```

I will dive into the helpers of getAllPosts and getDate pages in a short bit. The next item I had to add was a function to display each blog post item from the .map statement in the default export function.

```jsx
function BlogListItem({ slug, title, date, summary, hero, hero_alt }) {
  return (
    <div className="border text-sb-dark bg-sb-light border-sb-dark shadow hover:shadow-md hover:border-sb-med rounded-md p-4 transition duration-200 ease-in">
      <div className="block border-b-4 border-sb-dark pb-2">
        <Link href={`/blog/${slug}`}>
          <a>
            {hero && (
              <Image
                src={hero}
                alt={hero_alt}
                width="100%"
                height="100%"
                layout="responsive"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer("100%", "75%")
                )}`}
              />
            )}
            <br />
            <span className="font-bold">{title}</span>
          </a>
        </Link>
      </div>
      <div className="text-sb-md text-xs pt-2 font-semibold">{date}</div>
      <div>{summary}</div>
    </div>
  );
}
```

### Helper Functions:

I have a folder in my base directory named 'lib' that I use for my helper functions for my site. two of these are the getAllPosts function and my getDate function.

### getAllposts.js:

This file retrieves each mark down file and parses the front matter into a format easily consumed by my display function.

```jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "_content");

export function getAllPosts() {
  const allPosts = fs.readdirSync(contentDirectory);

  return allPosts.map(fileName => {
    const slug = fileName.replace(".md", "");
    const fileContents = fs.readFileSync(
      path.join(contentDirectory, fileName),
      "utf8"
    );
    const { data, content } = matter(fileContents);
    return {
      data,
      date: data.date,
      content,
      slug,
    };
  });
}
```

### getDate.js:

This function parses the ISO string for the date into the format that I want to have shown on the site where visible. This could be done much easier if you so require but I like to use the US military format for date which is `dd Month yyyy`. I am not currently using the hours/minutes/ampm in my display but I wrote the code for them and if I desire to use them in the future, I can just add those portions to the return statement.

```jsx
export default function getDate(date) {
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
  const ampm = hr >= 12 ? "PM" : "AM";
  const min = new Date(dt).getMinutes();
  const minutes = min >= 10 ? min : "0" + min;
  const hour =
    ampm === "PM" && hr % 12 === 0
      ? 12
      : ampm === "AM" && hr % 12 === 0
      ? "00"
      : hr % 12;

  const fullDate = {
    month,
    day,
    year,
    hour,
    minutes,
    ampm,
  };
  // Return the date as a string
  // use the following for time output in the return ${fullDate.hour + ":" + fullDate.minutes} ${fullDate.ampm}
  return `${fullDate.day} ${fullDate.month} ${fullDate.year}`;
}
```

### Tackling the [slug].js file

This is the file that gave me the most trouble. This is where I fully render each blog post to the page for you, the viewer to read. In the examples I found online, they all referenced a source prop on the `<MDXRemote />` component. I tried to use that as my basis but kept getting an error relating to the source prop. After searching and looking at all articles I could find, they all had that source prop but no one had the fix I needed. I then did a search of GitHub for 'MDXRemote' and filtered it on Javascript since I am not using Typescript on this project and I found my answer after digging through a few repositories.

Add the required imports and base for the slug page.

```jsx
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getAllPosts } from "../../lib/data";
import getDate from "../../lib/getDate";
import remarkPrismPlugin from "remark-prism";

export default ({ title, date, content }) => {
  return (
    <div className=" w-3/4 lg:w-1/2 px-10 h-full overflow-scroll m-auto text-sb-norm border-sb-dark border-solid border-2 rounded-lg bg-sb-light shadow p-3 mt-20 ">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="text-sb-dark border-b-2 border-sb-dark border-opacity-75 border-solid pb-2">
        <h1 className="text-4xl font-medium ">{title}</h1>
        <h2 className="text-md">{date}</h2>
      </div>
      <article className="pt-3 prose min-w-full">
        <MDXRemote {...content} />
      </article>
    </div>
  );
};
```

I am not using the component property of MDX but if you were, you would need to split the components out into their own prop ie: `<MDXRemote {...content} components={components} />`

There are 2 other functions required in the [slug].js file. Those are getStaticProps and getStaticPaths. The getStaticProps is similar to the one we added in the index but with added data to serialize the markdown code to HTML. I added the remarkPrism code highlighting after I got the blog posts to show the way I wanted and was a little of an after-thought honestly.

```jsx
export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();
  const { data, content } = allPosts.find(item => item.slug === params.slug);
  const mdxSource = await serialize(content, {
    // Needed for highlighting code within code blocks.
    mdxOptions: {
      remarkPlugins: [remarkPrismPlugin],
    },
  });

  return {
    props: {
      ...data,
      date: getDate(data.date),
      content: mdxSource,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPosts().map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}
```

And there you have it. Create a directory under your main project directory called \_content and toss a couple of .md files in there and you should be good to go. Make sure you add in your front matter into the files in YAML format:

```yaml
---
title: "The Trek to NextJS pt2"
layout: "post"
date: "2022-01-01T15:27:20.657Z"
summary: "I had a few issues getting the blog portion to work properly. I explain more in detail"
hero: "/blog_heros/fuji-sakura.jpg"
hero_alt: "Mount Fuji with Cherry Blossom Tree"
tags: ["next", "javascript", "react", "tailwindcss", "blog", "MDX", "Markdown"]
---
```

And in the public directory, add a blog_heros directory with any image files you wish to use for that part of the index.js page.

I hope you found this useful and not super annoying. I am just starting out on my tech writing journey and hope to get better at it as I go along.

In my next post, I will go through the steps I had to take to get reCaptcha working on my contact page. Until then, keep coding!

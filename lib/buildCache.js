const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const contentDirectory = path.join(process.cwd(), "../_content");
const cacheDirectory = path.join(process.cwd(), "../cache");
const getAllPosts = () => {
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
};

const sortPosts = allPosts => {
  const posts = allPosts;
  const allPostsSorted = posts.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });

  return allPostsSorted;
};

function getData() {
  const allPosts = getAllPosts();
  const allPostsSorted = sortPosts(allPosts);
  return allPostsSorted;
}

const cache = articles => {
  const baseUrl = "https://hitekredneck.io";
  // map over article to get data to build new object.
  const posts = articles.map(post => {
    const { slug } = post;
    const { summary, title } = post.data;

    const url = `${baseUrl}/blog/${slug}`;

    return {
      title,
      id: slug,
      link: url,
      summary,
    };
  });
  console.log(articles);
  return JSON.stringify(posts);
};

const buildCache = () => {
  const articles = getData();
  // build cache data
  const fileContent = `export const posts = ${cache(articles)}`;
  try {
    fs.readdirSync(cacheDirectory);
  } catch (e) {
    fs.mkdirSync(cacheDirectory);
  }
  // Write cache file to cache directory.
  fs.writeFile(cacheDirectory + "/data.js", fileContent, err => {
    if (err) {
      console.error(err);
    }
    console.log("Posts Cached");
  });
};

buildCache();

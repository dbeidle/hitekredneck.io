import { Feed } from "feed";
import fs from "fs";

export const buildRSSFeed = articles => {
  const baseUrl = "https://hitekredneck.io";
  const author = {
    name: "Dave Beidle",
    email: "dave@hitekredneck.io",
    link: "https://twitter.com/lifeofdave",
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: "Posts by Dave Beidle",
    description: "Musings about Web Development and other code writing tales.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
  });

  // Add each article to the feed
  articles.forEach(post => {
    console.log(post);
    const { date, slug, content } = post;
    const { summary, title } = post.data;

    const url = `${baseUrl}/blog/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      summary,
      content,
      author: [author],
      date: new Date(date),
    });
  });

  // Write the RSS output to a public file, making it
  // accessible at ashleemboyer.com/rss.xml
  fs.writeFileSync("public/rss.xml", feed.rss2());
};

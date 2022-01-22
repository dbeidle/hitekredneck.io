import Landing from "../components/landing";
import { getAllPosts } from "../lib/data";
import sortPosts from "../lib/sortPosts";
import { buildRSSFeed } from "../lib/buildRSSFeed";

export default function Home() {
  return (
    <div>
      <Landing />
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const allPostsSorted = await sortPosts(allPosts);

  buildRSSFeed(allPostsSorted);
  const props = { none: "none" };
  return { props };
}

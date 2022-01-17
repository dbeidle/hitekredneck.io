import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "../../lib/data";
import { shimmer, toBase64 } from "../../lib/blur";
import getDate from "../../lib/getDate";
import sortPosts from "../../lib/sortPosts";

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

export async function getStaticProps() {
  const allPosts = getAllPosts();
  const allPostsSorted = sortPosts(allPosts);
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

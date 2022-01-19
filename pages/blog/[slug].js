import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { getAllPosts } from "../../lib/data";
import getDate from "../../lib/getDate";
import remarkPrismPlugin from "remark-prism";

export default ({ title, date, fullDate, content, hero, summary, slug }) => {
  return (
    <div className=" w-3/4 lg:w-1/2 px-10 h-full overflow-scroll m-auto text-sb-norm border-sb-dark border-solid border-2 rounded-lg bg-sb-light shadow p-3 mt-20 ">
      <Head>
        <title>{title}</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={`https://hitekredneck.io${hero}`} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:creator" content="@lifeofdave" />
        <meta property="og:site_name" content="HiTekRedneck" />
        <meta property="og:image" content={`https://hitekredneck.io${hero}`} />
        <meta
          property="og:url"
          content={`https://hitekredneck.io/blog/${slug}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={summary} />
        <meta name="author" content="David Beidle II" />
        <meta property="article:publisher" content="https://hitekredneck.io" />
        <meta property="article:published_time" content={fullDate} />
        <meta property="article:modified_time" content={fullDate} />
      </Head>
      <div className="text-sb-dark border-b-2 border-sb-dark border-opacity-75 border-solid pb-2">
        <h1 className="text-4xl font-medium ">{title}</h1>
        <time className="text-md">{date}</time>
      </div>
      <article className="pt-3 prose min-w-full">
        <MDXRemote {...content} />
      </article>
    </div>
  );
};

export async function getStaticProps(context) {
  const { params } = context;
  const allPosts = getAllPosts();
  const { data, content, slug } = allPosts.find(
    item => item.slug === params.slug
  );
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
      fullDate: data.date,
      content: mdxSource,
      slug: slug,
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

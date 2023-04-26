import { getServerSideSitemapLegacy } from "next-sitemap";

export const getServerSideProps = async (context) => {
  let posts = await fetch("http://localhost:3000/api/sitemaps");
  posts = await posts.json();

  const newsSitemaps =
    posts &&
    posts?.data?.map((item) => ({
      loc: `${process.env.APP_URL}/post/${item.slug}`,
      changefreq: "daily",
      priority: 1,
      lastmod: item.updatedAt,
    }));

  return getServerSideSitemapLegacy(context, newsSitemaps);
};

export default function Site() {}

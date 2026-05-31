import { NewsApi } from "@/lib/api/clientApi";
import NewsCard from "@/components/NewsCard/NewsCard";
import css from "./page.module.css";

export default async function NewsPage() {
  const data = await NewsApi.getNews();

  return (
    <div className={css.container}>
      {data.results.map((news) => (
        <NewsCard
          key={news._id}
          news={news}
        />
      ))}
    </div>
  );
}
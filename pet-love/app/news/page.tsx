import { NewsApi } from "@/lib/api/clientApi";
import NewsCard from "@/components/NewsCard/NewsCard";
import css from "./page.module.css";
import SearchInput from "@/components/Searsh/SearchInput";

type Props = {
    searchParams:Promise  <{
        keyword?: string;
    }
>;
  }

export default async function NewsPage( { searchParams }: Props) {

  const params = await searchParams
  const keyword = params.keyword ?? "";
  const data = await NewsApi.getNews(keyword);
  
  return (
    <div className={css.container}>
      <SearchInput />
      <h1 className={css.title}>News</h1>
      {data.results.map((news) => (
        <NewsCard
          key={news._id}
          news={news}
        />
      ))}
    </div>
  );
}
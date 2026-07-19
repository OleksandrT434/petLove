import { NewsApi } from "@/lib/api/clientApi";
import NewsCard from "@/components/NewsCard/NewsCard";
import css from "./page.module.css";
import SearchInput from "@/components/Searsh/SearchInput";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination/Pagination";

type Props = {
    searchParams:Promise  <{
        keyword?: string;
        page?: string;
    }
>;
  }

export default async function NewsPage( { searchParams }: Props) {
  const params = await searchParams

  const keyword = params.keyword ?? "";
  const page = Number(params.page ?? 1);

  const data = await NewsApi.getNews(keyword, page, 6);
  
  
  return (
    <div className={css.container}>
  <Header variant="default" />

  <section className={css.content}>
    <div className={css.topBar}>
      <h1 className={css.title}>News</h1>
      <SearchInput basePath="/news"/>
    </div>

    <div className={css.cards}>
      {data.results.map((news) => (
        <NewsCard key={news._id} news={news} />
      ))}
    </div>
  </section>
  <Pagination totalPages={data.totalPages} basePath="/news" />
</div>
  );
}
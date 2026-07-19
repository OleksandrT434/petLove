import PetsCard from "@/components/PetsCard/PetsCard";
import Header from "@/components/Header/Header";
import { PetsApi } from "@/lib/api/clientApi";
import css from "./page.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchInput from "@/components/Searsh/SearchInput";

type Props = {
    searchParams: Promise <{
        page?:string
        keyword?:string
        category?:string
    }>
}

export default async function FindPetPage({searchParams}: Props) {

  const params = await searchParams
  const page = Number(params.page ?? 1);
  const keyword = params.keyword ?? "";
  const category = params.category ?? "";

const pets = await PetsApi.getPets({
    page,
    limit: 6,
    keyword,
    category
    
});

  return (
    <div className={css.container}>
      <Header variant="default" />
      <SearchInput basePath="/find-pet"/>
      <section className={css.content}>
        <div className={css.topBar}>
          <h1 className={css.title}>Find your favorite pet</h1>
        </div>
        <div className={css.cards}>
          {pets.results.map((pet) => (
            <PetsCard key={pet._id} pet={pet} />
          ))}
        </div>
      </section>
      <Pagination totalPages={pets.totalPages} basePath="/find-pet" />
    </div>
  );
} 


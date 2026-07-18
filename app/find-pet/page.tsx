import PetsCard from "@/components/PetsCard/PetsCard";
import Header from "@/components/Header/Header";
import { PetsApi } from "@/lib/api/clientApi";
import css from "./page.module.css";

export default async function FindPetPage() {
  const pets = await PetsApi.getPets();

  return (
    <div className={css.container}>
      <Header variant="default" />
      <section className={css.content}>
        <div className={css.topBar}>
          <h1 className={css.title}>Find your favorite pet</h1>
        </div>
        <div className={css.cards}>
          {pets.map((pet) => (
            <PetsCard key={pet._id} pet={pet} />
          ))}
        </div>
      </section>
    </div>
  );
} 


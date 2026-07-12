import PetsCard from "@/components/PetsCard/PetsCard";
import Header from "@/components/Header/Header";
import { PetsApi } from "@/lib/api/clientApi";
import css from "./page.module.css";

export default async function FindPetPage() {
    const pets = await PetsApi.getPets();

    return (
        <section className={css.section}>
          <Header variant="default" />
          <h1 className={css.title}>Find your favorite pet</h1>
             <main className={css.main}>
              <div className={css.petsList}>
                   {pets.map((pet) => (
                       <PetsCard
                        key={pet._id}
                        pet={pet}
                        />
                    ))}
                </div>
             </main>
        </section>
        );
}


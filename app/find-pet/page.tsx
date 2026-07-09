import PetsCard from "@/components/PetsCard/PetsCard";
import Header from "@/components/Header/Header";
import { PetsApi } from "@/lib/api/clientApi";

export default async function FindPetPage() {
    const pets = await PetsApi.getPets();

    return (
        <section>
            <Header variant="default" />
            <h1>Find your favorite pet</h1>
            <div>
                {pets.map(pet => (
                    <PetsCard
                        key={pet._id}
                        pet={pet}
                    />
                ))}
             </div>
        </section>
    );
}


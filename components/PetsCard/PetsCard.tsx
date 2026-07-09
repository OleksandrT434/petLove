import {type Pet} from "@/types/pets";
import css from "./PetsCard.module.css";
import Image from "next/image";

type Props = {
    pet: Pet;
};

export default function PetsCard({ pet }: Props) {
    return (
        <article className={css.card}>
            <Image 
                src={pet.imgURL}
                alt={pet.name}
                width={80}
                height={80}
                className={css.image}
            />
            <div className={css.info}>
                <h3 className={css.title}>{pet.name}</h3>
                <p className={css.description}>{pet.comment}</p>
            </div>
        </article>
    );
}
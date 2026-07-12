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
                width={287}
                height={187}
                className={css.image}
            />
            <section className={css.info}>
                <h2 className={css.title}>{pet.title}</h2>
                <p className={css.name}>Name {pet.name}</p>
                <p className={css.text}>Birthday {pet.birthday}</p>
                <p className={css.text}>Sex {pet.sex}</p>
                <p className={css.text}>Species {pet.species}</p>
                <p className={css.text}>Category {pet.category}</p>
            </section>
            <div className={css.descriptionContainer}>
                <h2 className={css.description}>{pet.comment}</h2>
                <h2 className={css.price}>{pet.price}</h2>
            </div>
            <button className={css.button}>Learn more</button>
        </article>
    );
}
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
              height={178}
              className={css.image}
                />

  <div className={css.content}>
    <div className={css.header}>
      <h2 className={css.title}>{pet.title}</h2>
          <div className={css.rating}>
               ⭐ {pet.popularity}
         </div>
    </div>

    <ul className={css.meta}>
      <li>
        <span>Name</span>
        <p>{pet.name}</p>
      </li>
      <li>
        <span>Birthday</span>
        <p>{pet.birthday}</p>
      </li>
      <li>
        <span>Sex</span>
        <p>{pet.sex}</p>
      </li>
      <li>
        <span>Species</span>
        <p>{pet.species}</p>
      </li>
      <li>
        <span>Category</span>
        <p>{pet.category}</p>
      </li>
    </ul>

    <p className={css.description}>
      {pet.comment}
    </p>

      {pet.price !== undefined && (
        <p className={css.price}>
         ${pet.price}
        </p>)}

    <div className={css.actions}>
      <button className={css.button}>
        Learn more
      </button>

      <button className={css.favorite}>
        🤍
      </button>
    </div>
  </div>
</article>
    );
}
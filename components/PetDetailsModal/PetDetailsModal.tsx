"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Modal from "@/components/Modal/Modal";
import type { Pet } from "@/types/pets";
import css from "./PetDetailsModal.module.css";

type PetDetailsModalProps = {
  pet: Pet;
  onClose: () => void;
};

export default function PetDetailsModal({ pet, onClose }: PetDetailsModalProps) {
  const badgeText = pet.price !== undefined && pet.price !== null ? "sell" : "free";

  return (
    <Modal onClose={onClose} className={css.modalShell}>
      <div className={css.content}>
        <div className={css.imageWrap}>
          <Image src={pet.imgURL} alt={pet.name} width={120} height={120} className={css.avatar} />
          <span className={css.badge}>{badgeText}</span>
        </div>

        <h3 className={css.title}>{pet.title}</h3>

        <div className={css.ratingRow}>
          <div className={css.stars}>
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={index < Math.min(5, pet.popularity ?? 0) ? css.starActive : css.starInactive}
              />
            ))}
          </div>
          <span className={css.ratingValue}>{pet.popularity}</span>
        </div>

        <div className={css.metaGrid}>
          <div className={css.metaItem}>
            <span>Name</span>
            <p>{pet.name}</p>
          </div>
          <div className={css.metaItem}>
            <span>Birthday</span>
            <p>{pet.birthday}</p>
          </div>
          <div className={css.metaItem}>
            <span>Sex</span>
            <p>{pet.sex}</p>
          </div>
          <div className={css.metaItem}>
            <span>Species</span>
            <p>{pet.species}</p>
          </div>
        </div>

        <p className={css.description}>{pet.comment}</p>

        {pet.price !== undefined && pet.price !== null && (
          <p className={css.price}>${pet.price}</p>
        )}

        <div className={css.actions}>
          <button type="button" className={css.favoriteButton}>
            Add to heart
          </button>
          <button type="button" className={css.contactButton}>
            Contact
          </button>
        </div>
      </div>
    </Modal>
  );
}

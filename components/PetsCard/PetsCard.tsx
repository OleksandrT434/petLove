"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Pet } from "@/types/pets";
import css from "./PetsCard.module.css";
import Image from "next/image";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthApi } from "@/lib/api/clientApi";
import { useAuth } from "@/components/AuthContext/AuthContext";
import Modal from "@/components/Modal/Modal";
import PetDetailsModal from "@/components/PetDetailsModal/PetDetailsModal";

type Props = {
    pet: Pet;
};

export default function PetsCard({ pet }: Props) {
    const router = useRouter();
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleFavoriteToggle = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (isLoading) return;

        setIsLoading(true);

        try {
            if (isFavorite) {
                await AuthApi.removeNoticeFromFavorites(pet._id);
            } else {
                await AuthApi.addNoticeToFavorites(pet._id);
            }

            setIsFavorite((prev) => !prev);
        } catch (error) {
            console.error("Error updating favorites:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
                   <FaStar  className={css.star}/>
                   {pet.popularity}
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

         
           <div className={css.footer}>
              {pet.price !== undefined && pet.price !== null && (
                <p className={css.price}>${pet.price}</p>
               )}

             <div className={css.actions}>
               <button type="button" className={css.button} onClick={() => setShowDetailsModal(true)}>
                 Learn more
               </button>
               <button
                 type="button"
                 className={`${css.favorite} ${isFavorite ? css.favoriteActive : ""}`}
                 onClick={handleFavoriteToggle}
                 disabled={isLoading}
                 aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
               >
                 {isFavorite ? <FaHeart className={css.heartFilled} /> : <FaRegHeart className={css.heart} />}
              </button>
            </div>
           </div>
      </div>
    </article>

        {showAuthModal && (
            <Modal onClose={() => setShowAuthModal(false)}>
                <div className={css.authModalContent}>
                    <p className={css.authTitle}>Please sign in</p>
                    <p className={css.authText}>
                        You need to log in or register before adding a pet to favorites.
                    </p>
                    <div className={css.authModalActions}>
                        <button
                            type="button"
                            className={css.authPrimaryButton}
                            onClick={() => {
                                setShowAuthModal(false);
                                router.push("/sign-in");
                            }}
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className={css.authSecondaryButton}
                            onClick={() => {
                                setShowAuthModal(false);
                                router.push("/sign-up");
                            }}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </Modal>
        )}

        {showDetailsModal && (
            <PetDetailsModal pet={pet} onClose={() => setShowDetailsModal(false)} />
        )}
        </>
    );
}
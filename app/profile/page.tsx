"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaPen, FaStar, FaTrash } from "react-icons/fa";
import Header from "@/components/Header/Header";
import { AuthApi } from "@/lib/api/clientApi"; 
import type { CurrentUserFull } from "@/types/auth";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";
import { useAuth } from "@/components/AuthContext/AuthContext";
import css from "./page.module.css";

type TabKey = "favorite" | "viewed";

export default function Profile() {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();

  const [user, setUser] = useState<CurrentUserFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [activeTab, setActiveTab] = useState<TabKey>("favorite");

  useEffect(() => {
    if (!authUser) {
      router.push("/");
      return;
    }

    async function loadUser() {
      try {
        const data = await AuthApi.getCurrentFull();
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, [authUser, router]);

  const handleUserSaved = (updatedUser: CurrentUserFull) => {
    setUser(updatedUser);
    setName(updatedUser.name);
    setEmail(updatedUser.email);
    setPhone(updatedUser.phone);
  };

  const handleRemoveFavorite = async (noticeId: string) => {
    try {
      await AuthApi.removeNoticeFromFavorites(noticeId);
      setUser((currentUser) =>
        currentUser
          ? {
              ...currentUser,
              noticesFavorites: currentUser.noticesFavorites.filter(
                (notice) => notice._id !== noticeId
              ),
            }
          : null
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      router.push("/");
    }
  };

  if (isLoading) {
    return <p className={css.emptyState}>Loading profile...</p>;
  }

  if (!authUser || loadError || !user) {
    return null;
  }

  const noticesToShow =
    activeTab === "favorite" ? user.noticesFavorites : user.noticesViewed;

  return (
  <div className={css.container}>
    <Header variant="default" />

    <main className={css.profileLayout}>
      <section className={css.profileCard}>
        <div className={css.topRow}>
          <div className={css.userBadge}>
            <FaUserAlt className={css.userBadgeIcon} />
            <span>User</span>
          </div>

          <button
            className={css.penButton}
            type="button"
            onClick={() => setIsEditModalOpen(true)}
          >
            <FaPen className={css.iconPen} />
          </button>
        </div>

        <div className={css.avatarSection}>
          <div className={css.avatarWrapper}>
             {user.avatar ? (
             <img
             src={user.avatar}
              alt={user.name}
             className={css.avatarImage}
            />
                 ) : (
               <FaUserAlt className={css.userIcon} />
              )}
            </div>

           <p className={css.uploadText}>
              Upload photo
           </p>
        </div>

        <section className={css.infoSection}>
          <h2 className={css.sectionTitle}>
            My information
          </h2>

          <div className={css.infoFields}>
            <input
              type="text"
              className={css.infoInput}
              value={name}
              readOnly
            />

            <input
              type="email"
              className={css.infoInput}
              value={email}
              readOnly
            />

            <input
              type="tel"
              className={css.infoInput}
              value={phone}
              readOnly
            />
          </div>
        </section>

        <section className={css.petsSection}>
          <div className={css.petsSectionHeader}>
            <h2 className={css.sectionTitle}>
              My pets
            </h2>

            <button
              type="button"
              className={css.addPetButton}
              onClick={() => router.push("/add-pet")}
            >
              Add pet +
            </button>
          </div>

          {user.pets.length === 0 ? (
            <p className={css.emptyState1}>
              You haven&apos;t added any pets yet.
            </p>
          ) : (
            <ul className={css.petsList}>
              {user.pets.map((pet) => (
                <li
                  key={pet._id}
                  className={css.petCard}
                >
                  <img
                    src={pet.imgURL}
                    alt={pet.name}
                    className={css.petImage}
                  />

                  <div className={css.petBody}>
                    <div className={css.petTopRow}>
                      <p className={css.petTitle}>
                        {pet.title}
                      </p>
                    </div>

                    <div className={css.petMetaRow}>
                      <div className={css.petInfoBlock}>
                        <span>Name</span>
                        <p>{pet.name}</p>
                      </div>

                      <div className={css.petInfoBlock}>
                        <span>Birthday</span>
                        <p>{pet.birthday}</p>
                      </div>

                      <div className={css.petInfoBlock}>
                        <span>Sex</span>
                        <p>{pet.sex}</p>
                      </div>

                      <div className={css.petInfoBlock}>
                        <span>Species</span>
                        <p>{pet.species}</p>
                      </div>
                    </div>

                    <div className={css.petFooterRow}>
                      <div className={css.petFooterInfo} />

                      <button
                        type="button"
                        className={css.petDeleteButton}
                        onClick={async () => {
                          try {
                            await AuthApi.removePet(pet._id);
                            setUser((currentUser) =>
                              currentUser
                                ? {
                                    ...currentUser,
                                    pets: currentUser.pets.filter(
                                      (item) => item._id !== pet._id
                                    ),
                                  }
                                : null
                            );
                          } catch (error) {
                            console.error("Error deleting pet:", error);
                          }
                        }}
                        aria-label="Delete pet"
                      >
                        <FaTrash className={css.petDeleteIcon} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
        <button
          type="button"
          className={css.logoutButton}
          onClick={handleLogout}
        >
          LOG OUT
        </button>
      </section>
      <section className={css.contentSection}>

        <div className={css.tabs}>
          <button
            type="button"
            className={`${css.tabButton} ${
              activeTab === "favorite"
                ? css.tabButtonActive
                : ""
            }`}
            onClick={() => setActiveTab("favorite")}
          >
            My favorite pets
          </button>

          <button
            type="button"
            className={`${css.tabButton} ${
              activeTab === "viewed"
                ? css.tabButtonActive
                : ""
            }`}
            onClick={() => setActiveTab("viewed")}
          >
            Viewed
          </button>
        </div>

        {noticesToShow.length === 0 ? (
          <p className={css.emptyState}>
            Oops, looks like there aren&apos;t any furries on this page yet.
            Do not worry! View your pets on the{" "}
            <a
              href="/find-pet"
              className={css.emptyStateLink}
            >
              find your favorite pet
            </a>{" "}
            page and add them to your favorites.
          </p>
        ) : (
          <ul className={css.favoriteList}>
            {noticesToShow.map((notice) => (
              <li
                key={notice._id}
                className={css.favoriteCard}
              >
                <img
                  src={notice.imgURL}
                  alt={notice.title}
                  className={css.favoriteImage}
                />

                <div className={css.favoriteBody}>
                  <div className={css.favoriteTitleRow}>
                    <p className={css.favoriteTitle}>
                      {notice.title}
                    </p>

                    <span className={css.favoriteRating}>
                      <FaStar className={css.starIcon} />
                      {notice.popularity}
                    </span>
                  </div>

                  <ul className={css.favoriteMeta}>
                    <li>
                      <span>Name</span>
                      <p>{notice.name}</p>
                    </li>
                    <li>
                      <span>Birthday</span>
                      <p>{notice.birthday}</p>
                    </li>
                    <li>
                      <span>Sex</span>
                      <p>{notice.sex}</p>
                    </li>
                    <li>
                      <span>Species</span>
                      <p>{notice.species}</p>
                    </li>
                    <li>
                      <span>Category</span>
                      <p>{notice.category}</p>
                    </li>
                  </ul>

                  <p className={css.favoriteDescription}>
                    {notice.comment}
                  </p>

                  <div className={css.favoriteFooter}>
                    <span className={css.favoritePrice}>
                      {notice.category === "free"
                        ? "Free"
                        : `$${notice.price ?? "—"}`}
                    </span>

                    <div className={css.favoriteActions}>
                      <button
                        type="button"
                        className={css.learnMoreButton}
                      >
                        Learn more
                      </button>

                      <button
                        type="button"
                        className={css.deleteButton}
                        onClick={() => handleRemoveFavorite(notice._id)}
                        aria-label="Remove from favorites"
                      >
                        <FaTrash className={css.deleteIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
    {isEditModalOpen && (
      <EditProfileModal
        user={user}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={handleUserSaved}
      />
    )}

  </div>
);
}
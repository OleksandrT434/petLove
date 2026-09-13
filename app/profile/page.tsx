"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaPen, FaStar, FaTrash } from "react-icons/fa";
import  Header from "@/components/Header/Header";
import { AuthApi } from "@/lib/api/clientApi"; 
import type { CurrentUserFull } from "@/types/auth";
import EditProfileModal from "@/components/EditProfileModal/EditProfileModal";


import css from "./page.module.css";

type TabKey = "favorite" | "viewed";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUserFull | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [activeTab, setActiveTab] = useState<TabKey>("favorite");

  useEffect(() => {
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
  }, []);

  const handleUserSaved = (updatedUser: CurrentUserFull) => {
    setUser(updatedUser);
    setName(updatedUser.name);
    setEmail(updatedUser.email);
    setPhone(updatedUser.phone);
  };

  const handleLogout = async () => {
    try {
      await AuthApi.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (isLoading) {
    return <p className={css.emptyState}>Loading profile...</p>;
  }
  if (loadError || !user) {
    return (
      <p className={css.emptyState}>
        Could not load your profile. Please try again later.
      </p>
    );
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

                  <div>
                    <p className={css.petName}>
                      {pet.name}
                    </p>

                    <p className={css.petMeta}>
                      {pet.species} · {pet.birthday} · {pet.sex}
                    </p>
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

                  <p className={css.favoriteDescription}>
                    {notice.comment}
                  </p>

                  <div className={css.favoriteFooter}>

                    <span className={css.favoritePrice}>
                      {notice.category === "free"
                        ? "Free"
                        : `$${notice.price ?? "—"}`}
                    </span>
                    <button
                      type="button"
                      className={css.learnMoreButton}
                    >
                      Learn more
                    </button>
                    <button
                      type="button"
                      className={css.deleteButton}
                    >
                      <FaTrash />
                    </button>

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
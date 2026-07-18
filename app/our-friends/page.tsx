import Header from "@/components/Header/Header";
import { FriendsApi } from "@/lib/api/clientApi";
import css from "./page.module.css";
import FriendsCard from "@/components/FriendsCard/friendsCard";

export default async function OurFriendsPage() {
  const data = await FriendsApi.getFriends();

  return (
    <div className={css.container}>
      <Header variant="default" />
      <section className={css.content}>
        <div className={css.topBar}>
          <h1 className={css.title}>Our Friends</h1>
        </div>
        <div className={css.cards}>
          {data.map((friend) => (
            <FriendsCard key={friend._id} friend={friend} />
          ))}
        </div>
      </section>
    </div>
  );
}
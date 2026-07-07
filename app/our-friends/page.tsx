import Header from "@/components/Header/Header";
import { FriendsApi } from "@/lib/api/clientApi";
import css from "./page.module.css";
import FriendsCard from "@/components/FriendsCard/friendsCard";


export default async function OurFriendsPage() {
const data = await FriendsApi.getFriends();
       
    return (
        <div className={css.friendsSection}>
            <Header variant="default" />
            <main>
                <section>
                <h1>Our Friends</h1>
                <div className={css.cards}>
                    {data.map((friend) => (
                        <FriendsCard key={friend._id} friend={friend} />
                    ))}
                </div>
            </section>
            </main>
        </div>
    );
}
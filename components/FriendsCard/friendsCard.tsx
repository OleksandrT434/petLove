import css from "./friendsCard.module.css";
import { type Friend } from "@/types/friends"
import Image from "next/image";


type Props = {
    friend: Friend;
};

export default function FriendsCard({ friend }: Props) {
    return (
        <article className={css.card}>
            <Image 
                 src={friend.imageUrl} 
                 alt={friend.title} 
                 width={80}
                    height={80}
                 className={css.image}
                 
                 />
            <h3 className={css.title}>{friend.title}</h3>
            <a
             href={friend.addressUrl}
             target="_blank"
             rel="noopener noreferrer"
            >
             {friend.address}
             </a>
            <a href={friend.url} target="_blank" rel="noopener noreferrer" className={css.link}>
                Visit Website
            </a>
            <a href={`tel:${friend.phone}`}>
               {friend.phone}
            </a>
            <a href={`mailto:${friend.email}`}>
             {friend.email}
            </a>
        </article>
    );
}
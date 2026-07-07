import css from "./friendsCard.module.css";
import { type Friend } from "@/types/friends"
import Image from "next/image";


type Props = {
    friend: Friend;
};

export default function FriendsCard({ friend }: Props) {
    const workTime = friend.workDays?.find(day => day.isOpen);
    const badgeText = workTime ? `${workTime.from} - ${workTime.to}` : "Day and night";

    return (
        <article className={css.card}>
            <span className={css.badge}>{badgeText}</span>
               <Image 
                 src={friend.imageUrl} 
                 alt={friend.title} 
                 width={80}
                 height={80}
                 className={css.image}     
                    />
                        <div className={css.info}>
                    <h3 className={css.title}>{friend.title}</h3>
                <p className={css.adress}>    
                   <span className={css.label}>Address:</span>{" "}
                   {friend.address ? (
                     <a
                       href={friend.addressUrl ?? "#"}
                       target="_blank"
                       rel="noopener noreferrer"
                        >
                       {friend.address}
                     </a>
                        ) : ("website only")}
                </p>

                <p>
                  <span className={css.label}>Phone:</span>{" "}
                  {friend.phone ? (
                    <a href={`tel:${friend.phone}`}>{friend.phone}</a>
                  ) : ("email only")}
                </p>

                <p>       
                   <span className={css.label}>Email:</span>{" "}
                   {friend.email ? (
                     <a href={`mailto:${friend.email}`}>{friend.email}</a>
                   ) : ("website only")}
                </p>
                </div>
        </article>
    );
}                     
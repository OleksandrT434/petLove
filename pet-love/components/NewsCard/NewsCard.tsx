import { type NewsCard } from "@/types/card";
import css from "./NewsCard.module.css";

type Props = {
  news: NewsCard;
}

export default function NewsCard({ news }: Props) {
  return (
    <article className={css.card}>
      <img src={news.imgUrl} alt={news.title} className={css.image} />
      <h2 className={css.title}>{news.title}</h2>

      <p className={css.text}>{news.text}</p>

      <span className={css.date}>{news.date}</span>
    </article>
  );
}
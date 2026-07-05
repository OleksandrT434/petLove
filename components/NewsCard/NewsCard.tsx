import { type NewsCard } from "@/types/card";
import css from "./NewsCard.module.css";

type Props = {
  news: NewsCard;
}

export default function NewsCard({ news }: Props) {
  const formattedDate = new Date(news.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <article className={css.card}>
      <img src={news.imgUrl} alt={news.title} className={css.image} />

      <h2 className={css.title}>{news.title}</h2>

      <p className={css.text}>{news.text}</p>

      <div className={css.footer}>
        <span className={css.date}>{formattedDate}</span>

        <a
          href={news.url}
          className={css.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </a>
      </div>
    </article>
  );
}
import type { UpcomingMovie } from "../../types/movie";
import noImage from "../../assets/images/no_img.jpg";
import css from "./Card.module.css";

interface CardProps {
  movie: UpcomingMovie;
  rank: number;
}

const formatReleaseDate = (date: string) => {
  if (!date) return "Coming soon";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const Card = ({ movie, rank }: CardProps) => {
  const {
    adult,
    backdrop_path,
    original_language,
    overview,
    poster_path,
    release_date,
    title,
    vote_average,
    vote_count,
  } = movie;

  const image = backdrop_path
    ? `${import.meta.env.VITE_TMDB_IMG_BACKDROP_URL}${backdrop_path}`
    : poster_path
      ? `${import.meta.env.VITE_TMDB_IMG_POSTER_URL}${poster_path}`
      : noImage;

  return (
    <li className={css.item} tabIndex={0}>
      <article className={css.card}>
        <img className={css.image} src={image} alt={title} loading="lazy" />
        <div className={css.shade} />

        <div className={css.topLine}>
          <span className={css.upcoming}>Upcoming</span>
          <span className={css.rank}>#{String(rank).padStart(2, "0")}</span>
        </div>

        <div className={css.content}>
          <div className={css.meta}>
            <span className={css.language}>{original_language}</span>
            {adult && <span className={css.adult}>18+</span>}
            <time dateTime={release_date}>{formatReleaseDate(release_date)}</time>
          </div>

          <h3 className={css.title}>{title}</h3>
          <p className={css.overview}>{overview || "More details coming soon."}</p>

          <div className={css.ratingRow}>
            <span
              className={css.rating}
              aria-label={`Rating ${vote_average.toFixed(1)} out of 10`}
            >
              <span aria-hidden="true">★</span> {vote_average.toFixed(1)}
            </span>
            <span className={css.votes}>{vote_count.toLocaleString()} votes</span>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Card;

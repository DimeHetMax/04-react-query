import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./SeriesModal.module.css";
import noImage from "../../assets/images/no_img.jpg";
import type { PopularSeries } from "../../types/series";

interface SeriesModalProps {
  series: PopularSeries;
  onClose: () => void;
}

const formatDate = (date: string) => {
  if (!date) return "To be announced";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const SeriesModal = ({ series, onClose }: SeriesModalProps) => {
  const {
    backdrop_path,
    first_air_date,
    genre_ids,
    id,
    name,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
  } = series;

  const backdrop = backdrop_path
    ? `${import.meta.env.VITE_TMDB_IMG_BACKDROP_URL}${backdrop_path}`
    : poster_path
      ? `${import.meta.env.VITE_TMDB_IMG_POSTER_URL}${poster_path}`
      : noImage;

  const poster = poster_path
    ? `${import.meta.env.VITE_TMDB_IMG_POSTER_URL}${poster_path}`
    : noImage;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="series-modal-title"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className={css.hero}>
          <img className={css.backdropImage} src={backdrop} alt="" />
          <div className={css.heroShade} />
          <span className={css.catalogue}>TV Series · #{id}</span>
        </div>

        <div className={css.body}>
          <aside className={css.posterWrap}>
            <img className={css.poster} src={poster} alt={`${name} poster`} />
          </aside>

          <div className={css.content}>
            <div className={css.heading}>
              <div>
                <h2 id="series-modal-title">{name}</h2>
                {original_name !== name && (
                  <p className={css.originalTitle}>{original_name}</p>
                )}
              </div>
              <span className={css.match}>{Math.round(vote_average * 10)}% Match</span>
            </div>

            <div className={css.meta}>
              <time dateTime={first_air_date}>{formatDate(first_air_date)}</time>
              <span className={css.language}>{original_language}</span>
              <span>{origin_country.join(" · ") || "International"}</span>
            </div>

            <p className={css.overview}>{overview || "Series details coming soon."}</p>

            <div className={css.stats}>
              <div className={css.stat}>
                <span className={css.statLabel}>Rating</span>
                <strong><span aria-hidden="true">★</span> {vote_average.toFixed(1)}</strong>
                <small>out of 10</small>
              </div>
              <div className={css.stat}>
                <span className={css.statLabel}>Popularity</span>
                <strong>{Math.round(popularity).toLocaleString()}</strong>
                <small>TMDB score</small>
              </div>
              <div className={css.stat}>
                <span className={css.statLabel}>Reviews</span>
                <strong>{vote_count.toLocaleString()}</strong>
                <small>viewer ratings</small>
              </div>
            </div>

            <div className={css.genres}>
              <span className={css.genreLabel}>Genres</span>
              {genre_ids.length > 0 ? (
                genre_ids.map((genre) => <span key={genre}>#{genre}</span>)
              ) : (
                <span>Not specified</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SeriesModal;

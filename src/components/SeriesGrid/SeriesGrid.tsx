import css from "./SeriesGrid.module.css";
import noImage from "../../assets/images/no_img.jpg";
import type { PopularSeries } from "../../types/series";

interface SeriesGridProps {
  series: PopularSeries[];
  onSelectSeries: (series: PopularSeries) => void;
}

const SeriesGrid = ({ onSelectSeries, series }: SeriesGridProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLLIElement>,
    selectedSeries: PopularSeries,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelectSeries(selectedSeries);
    }
  };

  return (
    <ul className={css.grid} aria-label="Popular TV series">
      {series.map((seriesItem) => {
        const {
          backdrop_path,
          first_air_date,
          name,
          original_language,
          overview,
          poster_path,
          vote_average,
          vote_count,
        } = seriesItem;

        const image = backdrop_path
          ? `${import.meta.env.VITE_TMDB_IMG_BACKDROP_URL}${backdrop_path}`
          : poster_path
            ? `${import.meta.env.VITE_TMDB_IMG_POSTER_URL}${poster_path}`
            : noImage;

        const releaseYear = first_air_date
          ? new Date(first_air_date).getFullYear()
          : "New";

        return (
          <li
            className={css.item}
            key={seriesItem.id}
            role="button"
            tabIndex={0}
            aria-label={`Open details for ${name}`}
            onClick={() => onSelectSeries(seriesItem)}
            onKeyDown={(event) => handleKeyDown(event, seriesItem)}
          >
            <article className={css.card}>
              <img className={css.image} src={image} alt={name} loading="lazy" />
              <div className={css.overlay} />

              <div className={css.content}>
                <div className={css.meta}>
                  <span>{releaseYear}</span>
                  <span className={css.language}>{original_language}</span>
                </div>

                <h3 className={css.title}>{name}</h3>
                <p className={css.overview}>{overview || "Series details coming soon."}</p>

                <div className={css.footer}>
                  <span className={css.rating}>
                    <span aria-hidden="true">★</span> {vote_average.toFixed(1)}
                  </span>
                  <span className={css.votes}>{vote_count.toLocaleString()} ratings</span>
                  <span className={css.details}>Details →</span>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
};

export default SeriesGrid;

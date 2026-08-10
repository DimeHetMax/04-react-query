import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./MovieModal.module.css";
import noImage from "../../assets/images/no_img.jpg";
import type { Movie } from "../../types/movie";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}
const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const { title, backdrop_path, overview, release_date, vote_average } = movie;
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <img
          src={
            backdrop_path
              ? `${import.meta.env.VITE_TMDB_IMG_BACKDROP_URL}${backdrop_path}`
              : noImage
          }
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default MovieModal;

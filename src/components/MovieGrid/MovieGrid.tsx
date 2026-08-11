import css from "./MovieGrid.module.css"
import type{ Movie } from "../../types/movie";
interface MovieGridProps{
    movies: Movie[];
    onSelect: (movie:Movie)=>void
}

const MovieGrid = ({onSelect, movies}:MovieGridProps) => {
  return (
    <ul className={css.grid}>
      {movies.map(({id, title, poster_path,  backdrop_path, overview, release_date, vote_average})=> 
      <li key={id} onClick={()=>onSelect({id, title, poster_path,  backdrop_path, overview, release_date, vote_average})}>
        <div className={css.card}>
          <img
            className={css.image}
            src={`${import.meta.env.VITE_TMDB_IMG_POSTER_URL}/${poster_path}`}
            alt={title}
            loading="lazy"
          />
          <h2 className={css.title}>{title}</h2>
        </div>
      </li>)}
     
    </ul>
  );
};
export default MovieGrid;

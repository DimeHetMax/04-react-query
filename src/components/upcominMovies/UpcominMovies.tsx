import Container from "../Container/Container";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import css from "./UpcominMovies.module.css";
import type { UpcomingMovie, Movie } from "../../types/movie";

interface UpcominMoviesSectionProps {
  upcomingMovies: UpcomingMovie[];
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setMovie:(movie: Movie)=> void
}

const UpcominMoviesSection = ({
  upcomingMovies,
  currentPage,
  totalPages,
  setPage,
  setMovie
}: UpcominMoviesSectionProps) => {
  const hasMovies = upcomingMovies.length > 0;

  return (
    <section className={css.section}>
      <Container>
        <div className={css.heading}>
          <div>
            <p className={css.eyebrow}>Coming soon</p>
            <h2 className={css.title}>Upcoming Movies</h2>
          </div>
          <span className={css.counter}>{upcomingMovies.length} premieres</span>
        </div>

        {hasMovies && (
          <ul
            className={css.grid}
            aria-label={`Upcoming movies, page ${currentPage}`}
          >
            {upcomingMovies.map((movie) => (
              <Card key={movie.id} movie={movie} setMovie={setMovie} />
            ))}
          </ul>
        )}

        {hasMovies && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        )}
      </Container>
    </section>
  );
};

export default UpcominMoviesSection;

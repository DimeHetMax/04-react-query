import Container from "../Container/Container";
import Card from "../Card/Card";
import css from "./UpcominMovies.module.css";
import type { UpcomingMovie, Movie } from "../../types/movie";

// Pagination
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

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
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </Container>
    </section>
  );
};

export default UpcominMoviesSection;

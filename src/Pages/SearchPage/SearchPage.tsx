import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Components
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import MovieModal from "../../components/MovieModal/MovieModal";
import Footer from "../../components/Footer/Footer";
// services
import fetchMovies from "../../services/movieService";

import css from "./SearchPage.module.css";
import type { Movie } from "../../types/movie";
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
const SearchPage = () => {
  const [querySearch, setQuerySearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: searchMovieData,
    isError: isErrorSearchMovie,
    isLoading: isLoadingSearchMovie,
    isSuccess: isSuccessSearchMovie,
  } = useQuery({
    queryKey: ["movies", querySearch, currentPage],
    queryFn: () => fetchMovies(querySearch, currentPage),
    enabled: querySearch !== "",
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (searchMovieData?.results.length === 0) {
      toast.success("No movies found for your request.");
    }
  }, [searchMovieData]);

  const onSubmit = (userInput: string) => {
    setQuerySearch(userInput);
    setCurrentPage(1);
  };
  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onModalClose = () => {
    setSelectedMovie(null);
  };
  const setPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const hasData =
    isSuccessSearchMovie &&
    !isLoadingSearchMovie &&
    !isErrorSearchMovie &&
    searchMovieData &&
    searchMovieData?.results.length > 0;

  return (
    <div className={css.content}>
      <SearchBar onSubmit={onSubmit} />
      <main className={css.mainContent}>
        {isSuccessSearchMovie && (
          <ReactPaginate
            pageCount={searchMovieData?.total_pages}
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
        {isLoadingSearchMovie && <Loader />}
        {isErrorSearchMovie && <ErrorMessage />}
        {hasData && (
          <MovieGrid movies={searchMovieData?.results} onSelect={onSelect} />
        )}

        {isSuccessSearchMovie && (
          <ReactPaginate
            pageCount={searchMovieData?.total_pages}
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
      </main>
      <Footer></Footer>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default SearchPage;

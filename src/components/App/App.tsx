import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Components
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

// services
import fetchMovies from "../../services/movieService";

import css from "./App.module.css";
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

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data?.results.length === 0) {
      toast.success("No movies found for your request.");
    }
  }, [data]);
  const onSubmit = (userInput: string) => {
    setQuery(userInput);
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
  const hasData =isSuccess && !isLoading && !isError && data && data?.results.length > 0;
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isSuccess && (
        <ReactPaginate
          pageCount={data?.total_pages}
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && <MovieGrid movies={data?.results} onSelect={onSelect} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default App;

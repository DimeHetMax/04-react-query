import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Components
import { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Pagination from "../Pagination/Pagination";

// services
import fetchMovies from "../../services/movieService";

import "./App.module.css";
import type { Movie } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const onSubmit = (userInput: string) => {
    setQuery(userInput);
  };
  const onSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onModalClose = () => {
    setSelectedMovie(null);
  };
  const onPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const hasData = !isLoading && !isError && data?.results.length > 0;
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {hasData && (
        <Pagination
          totalPages={data?.total_pages ?? 0}
          currentPage={page}
          onPageChange={onPageChange}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasData && <MovieGrid movies={data.results} onSelect={onSelect} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={onModalClose} />
      )}
      <Toaster position="top-right" />
    </>
  );
};

export default App;

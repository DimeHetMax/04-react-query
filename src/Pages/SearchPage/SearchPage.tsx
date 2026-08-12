import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

// Components
import { toast, Toaster } from "react-hot-toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieGrid from "../../components/MovieGrid/MovieGrid";
import MovieModal from "../../components/MovieModal/MovieModal";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
// services
import fetchMovies from "../../services/movieService";
import fetchPopularMovies from "../../services/popularService";

import css from "./SearchPage.module.css";
import type { Movie } from "../../types/movie";
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
  console.log(searchMovieData);
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
   querySearch !== "" &&
    isSuccessSearchMovie &&
    !isLoadingSearchMovie &&
    !isErrorSearchMovie &&
    searchMovieData &&
    searchMovieData?.results.length > 0;
  const {
    data: popularMovies,
    isLoading: isLoadingPopularMovies,
    isError: isErrorPopularMovies,
    isSuccess: isSuccessPopularMovies,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => fetchPopularMovies(),
  });

  const hasPopularMovies =
    !isLoadingPopularMovies &&
    !isErrorPopularMovies &&
    isSuccessPopularMovies &&
    popularMovies?.results.length > 0;

  const handleClearForm = () => {
    setQuerySearch("");
    setCurrentPage(1);
    setSelectedMovie(null);
  };

  return (
    <div className={css.content}>
      <SearchBar onSubmit={onSubmit} onClearSearch={handleClearForm} />
      <main className={css.mainContent}>
        {querySearch.length === 0 && !hasData && hasPopularMovies && (
          <HeroSection popularMovies={popularMovies.results} />
        )}
        {querySearch !== "" && isSuccessSearchMovie && hasData &&(
          <Pagination
            totalPages={searchMovieData.total_pages}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        )}
        {isLoadingSearchMovie && <Loader />}
        {isErrorSearchMovie && <ErrorMessage />}
        {hasData && (
          <MovieGrid movies={searchMovieData?.results} onSelect={onSelect} />
        )}

        {querySearch !== "" && isSuccessSearchMovie && hasData && (
          <Pagination
            totalPages={searchMovieData.total_pages}
            currentPage={currentPage}
            onPageChange={setPage}
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

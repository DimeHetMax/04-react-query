import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

//Components
import Navigation from "../../components/Navigation/Navigation";
import HeroSection from "../../components/HeroSection/HeroSection";
import UpcominMoviesSection from "../../components/upcominMovies/UpcominMovies";
import MovieModal from "../../components/MovieModal/MovieModal";
import PopularSeriesSection from "../../components/PopularSeries/PopularSeriesSection";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SeriesModal from "../../components/SeriesModal/SeriesModal";
import Footer from "../../components/Footer/Footer";
//Services
import fetchPopularMovies from "../../services/popularService";
import fetchUpcomingMovies from "../../services/upcomingServices";
import fetchPopularSeries from "../../services/popularSericeService";

//styles
import css from "./HomePage.module.css";
//Type
import type { Movie } from "../../types/movie";
import type { PopularSeries } from "../../types/series";


const HomePage = () => {
  //Popular Movies
  const {
    data: popularMovie,
    isSuccess: isSuccessPopularMovie,
    isLoading: isLoadingPopularMovie,
    isError: isErrorPopularMovie,
    error: errorPopularMovie,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => fetchPopularMovies(),
    placeholderData: keepPreviousData,
  });

  const [upcomingPage, setUpcomingPage] = useState<number>(1);
  //Upcoming Movies
  const {
    data: upcomingMovies,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useQuery({
    queryKey: ["upcomingMovies", upcomingPage],
    queryFn: () => fetchUpcomingMovies(upcomingPage),
    placeholderData: keepPreviousData,
  });
  //Movie for Modal
  const [chosenMovie, setChosenMovie] = useState<Movie | null>(null);
  const onCloseMovie = () => {
    setChosenMovie(null);
  };
  const hasMovies =
    isSuccessPopularMovie &&
    !errorPopularMovie &&
    !isErrorPopularMovie &&
    popularMovie?.results.length > 0;
  //Popular series
  const [popularSeriesPage, setPopularSeriesPage] = useState<number>(1);
  const {
    data: popularSeries,
    isLoading: isLoadingPopularSeries,
    isError: isErrorPopularSeries,
    error: ErrorPopularSeries,
  } = useQuery({
    queryKey: ["popularSeries", popularSeriesPage],
    queryFn: () => fetchPopularSeries(popularSeriesPage),
    placeholderData: keepPreviousData,
  });
  const [chosenSeries, setChosenSeries] = useState<PopularSeries | null>(null);
  const onCloseSeries = () => {
    setChosenSeries(null);
  };
  const hasSeries =
    !ErrorPopularSeries &&
    !isLoadingPopularSeries &&
    !isErrorPopularSeries &&
   (popularSeries?.results.length ?? 0) > 0;
  return (
    <div className={css.page}>
      <Navigation />

      <main className={css.hero}>
        <div className={css.content}>
          <p className={css.eyebrow}>Your personal movie collection</p>
          <h1 className={css.title}>
            Find a movie for <span>every mood.</span>
          </h1>
          <p className={css.description}>
            Search for movies, explore details and choose what to watch next.
          </p>
          <Link className={css.button} to="/search">
            Explore movies <span aria-hidden="true">→</span>
          </Link>
        </div>

        {isLoadingPopularMovie && <Loader />}
        {isErrorPopularMovie && <ErrorMessage />}
        {hasMovies && <HeroSection popularMovies={popularMovie?.results} />}

        {isUpcomingLoading && <Loader />}
        {isUpcomingError && <ErrorMessage />}

        {upcomingMovies && (
          <UpcominMoviesSection
            upcomingMovies={upcomingMovies?.results}
            currentPage={upcomingPage}
            totalPages={upcomingMovies?.total_pages}
            setPage={setUpcomingPage}
            setMovie={setChosenMovie}
          />
        )}

        {isLoadingPopularSeries && <Loader />}
        {isErrorPopularSeries && <ErrorMessage />}
        {hasSeries && popularSeries &&(
          <PopularSeriesSection
            series={popularSeries.results}
            currentPage={popularSeriesPage}
            totalPages={popularSeries.total_pages}
            setPage={setPopularSeriesPage}
            setSeries={setChosenSeries}
          />
        )}
      </main>
     <Footer></Footer>

      {chosenMovie && <MovieModal movie={chosenMovie} onClose={onCloseMovie} />}
      {chosenSeries && (
        <SeriesModal series={chosenSeries} onClose={onCloseSeries} />
      )}
    </div>
  );
};

export default HomePage;

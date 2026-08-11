import { Link } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

//Components
import Navigation from "../../components/Navigation/Navigation";
import HeroSection from "../../components/HeroSection/HeroSection";
import UpcominMoviesSection from "../../components/upcominMovies/UpcominMovies";

import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
//Services
import fetchPopularMovies from "../../services/popularService";
import fetchUpcomingMovies from "../../services/upcomingServices";

//styles
import css from "./HomePage.module.css";
import { useState } from "react";

const HomePage = () => {
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
  const {
    data: upcomingMovies,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useQuery({
    queryKey: ["upcomingMovies", upcomingPage],
    queryFn: () => fetchUpcomingMovies(upcomingPage),
    placeholderData: keepPreviousData,
  });
  console.log("Home Page Upcoming Movies", upcomingMovies);

  const hasMovies =
    isSuccessPopularMovie &&
    !errorPopularMovie &&
    !isErrorPopularMovie &&
    popularMovie?.results.length > 0;
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
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;

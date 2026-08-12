import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay } from "swiper/modules";

import type { PopularMovie } from "../../types/movie";
import css from "./HeroSection.module.css";

interface HeroSectionProps {
  popularMovies: PopularMovie[];
}

const shuffleMovies = (movies: PopularMovie[]) => {
  const shuffled = [...movies];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

const HeroSection = ({ popularMovies }: HeroSectionProps) => {
  const [shuffledMovies] = useState(() => shuffleMovies(popularMovies));

  return (
    <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={shuffledMovies.length > 1}
      speed={900}
      modules={[Autoplay]}
      className={css.slider}
    >
      {shuffledMovies.map((movie) => (
        <SwiperSlide className={css.slide} key={movie.id}>
          <img
            className={css.image}
            src={`${import.meta.env.VITE_TMDB_IMG_BACKDROP_URL}${movie.backdrop_path}`}
            alt={movie.title}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default HeroSection;

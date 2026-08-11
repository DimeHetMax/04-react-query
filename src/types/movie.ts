export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface PopularMovie {
  adult: boolean;
  id: number;
  genre_ids: number[];
  poster_path: string;
  backdrop_path: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  overview: string;
  popularity: number;
  release_date: string;
  original_language: string;
  original_title: string;
}

export interface UpcomingMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

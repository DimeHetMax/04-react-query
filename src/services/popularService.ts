import { API } from "./movieService";
import type { PopularMovie } from "../types/movie";

interface FetchPopularMoviesPopular {
  page: number;
  results: PopularMovie[];
  total_pages: number;
}
const fetchPopularMovies = async (): Promise<FetchPopularMoviesPopular> => {
  const response = await API.get<FetchPopularMoviesPopular>("/movie/popular");

  return response.data;
};
export default fetchPopularMovies;

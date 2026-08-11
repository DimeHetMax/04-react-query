import { API } from "./movieService";
import type { UpcomingMovie } from "../types/movie";

interface FetchUpcomingMoviesProps {
  page: number;
  results: UpcomingMovie[];
  total_pages: number;
}
const fetchUpcomingMovies = async (
  page: number,
): Promise<FetchUpcomingMoviesProps> => {
  const response = await API.get<FetchUpcomingMoviesProps>("/movie/upcoming", {
    params: {
      page,
    },
  });
  return response.data;
};

export default fetchUpcomingMovies;

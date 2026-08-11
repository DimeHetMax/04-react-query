import axios from "axios";
import type { Movie } from "../types/movie";

  export const API = axios.create({
  baseURL: `${import.meta.env.VITE_TMDB_URL}`,
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
});

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}
const fetchMovies = async (
  query: string,
  page: number,
): Promise<FetchMoviesResponse> => {
  const response = await API.get<FetchMoviesResponse>("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export default fetchMovies;

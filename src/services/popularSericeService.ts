import { API } from "./movieService";
import type { PopularSeries } from "../types/series";

interface FetchPopularSeries {
  page: number;
  results: PopularSeries[];
  total_pages: number;
}
const fetchPopularSeries = async (
  page: number,
): Promise<FetchPopularSeries> => {
  const response = await API.get<FetchPopularSeries>("/tv/popular", {
    params: {
      page,
    },
  });
  return response.data;
};
export default fetchPopularSeries;

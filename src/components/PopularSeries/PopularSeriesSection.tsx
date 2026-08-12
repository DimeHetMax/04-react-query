import Container from "../Container/Container";
import SeriesGrid from "../SeriesGrid/SeriesGrid";
import Pagination from "../Pagination/Pagination";
import type{ PopularSeries } from "../../types/series";


interface PopularSeriesSectionProps{
series:PopularSeries[];
currentPage: number;
totalPages: number;
 setPage:(page: number)=>void;
 setSeries:(series:PopularSeries)=>void
}
const PopularSeriesSection = ({series,currentPage,totalPages, setPage, setSeries}:PopularSeriesSectionProps) => {
  return (
    <div>
      <Container>
        <h2>Popular Series</h2>
        { series.length>0 && <SeriesGrid series={series} onSelectSeries={setSeries}/>}
          {series.length>0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setPage}
          />
        )}
      </Container>
    </div>
  );
};
export default PopularSeriesSection;

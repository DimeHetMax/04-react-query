import Container from "../Container/Container";
import SeriesGrid from "../SeriesGrid/SeriesGrid";
import type{ PopularSeries } from "../../types/series";


// Pagination
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from "./PopularSeriesSection.module.css"

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;


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
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </Container>
    </div>
  );
};
export default PopularSeriesSection;

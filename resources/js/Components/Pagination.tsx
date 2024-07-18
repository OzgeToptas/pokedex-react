import { setCurrentPage } from "@/Redux/features/pokeSlice";
import { useAppDispatch, useAppSelector } from "@/Redux/hook"

function Pagination({ pokeLength }: {pokeLength: number}) {
  const dispatch = useAppDispatch();
  const { currentPage, pagesPerPage } = useAppSelector((state) => state.poke.pagination)
  const pageNumbers = Array.from({ length: pokeLength }, (_, index) => index + 1)

  const handdleFistPage = () => dispatch(setCurrentPage(1))
  const handdleLastPage = () => dispatch(setCurrentPage(Math.floor(pokeLength / pagesPerPage)))
  const handlePrevPage = () => {
    if (currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < pokeLength) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  if(pokeLength < 9) return null
  const threshold = 5;

  let startPage = currentPage <= threshold ? 1 : currentPage - (threshold - 1);
  const endPage = startPage + threshold - 1;
  return (
    <div className="pagination flex items-center gap-4 mb-5">
      <button className="prev-btn" type="button" onClick={handdleFistPage}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
      </svg>
      </button>
      <button className="prev-btn" type="button" onClick={handlePrevPage}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>

      </button>
      <div className="flex items-center gap-2">
        {pageNumbers.slice(startPage - 1, endPage).map((page: number) => (
          <button
            key={page}
            type="button"
            className={`page-btn ${currentPage === page && 'active'}`}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="next-btn" type="button" onClick={handleNextPage}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <button className="next-btn" type="button" onClick={handdleLastPage}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination

import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "phosphor-react";
import { useRef } from "react";
import { PaginatorProps } from "../../types/components/PaginatorProps";
import { int } from "../../utils/convert";
import { Main } from "./styles";

export default function Paginator({ page, setPage, update, setUpdate, data }:PaginatorProps) {
  const pageContainerRef = useRef<HTMLDivElement>()

  function handleChangePage(elmnt_left: number, page: number) {
    setPage(page)

    pageContainerRef.current.scrollTo({
      left: elmnt_left - 128,
      behavior: 'smooth'
    })

    setUpdate && setUpdate(!update)
  }

  function handleFirstPage() {
    setPage(1)

    pageContainerRef.current.scrollBy({
      left: -100000,
      behavior: 'smooth'
    })

    setUpdate && setUpdate(!update)
  }

  function handleLastPage() {
    setPage(int(data.pages))

    pageContainerRef.current.scrollBy({
      left: +100000,
      behavior: 'smooth'
    })

    setUpdate && setUpdate(!update)
  }

  function handlePreviousPage() {
    page > 1 && setPage(page - 1)

    pageContainerRef.current.scrollBy({
      left: -32,
      behavior: 'smooth'
    })

    setUpdate && setUpdate(!update)
  }

  function handleNextPage() {
    page < int(data.pages) && setPage(page + 1)

    pageContainerRef.current.scrollBy({
      left: +32,
      behavior: 'smooth'
    })

    setUpdate && setUpdate(!update)
  }

  return (
    <Main>
      <div className="paginationButtons">
            <button onClick={handleFirstPage} disabled={!(page > 1)}>
              <CaretDoubleLeft size={14} weight="regular" />
            </button>
            <button onClick={handlePreviousPage} disabled={!(page > 1)}>
              <CaretLeft size={14} weight="regular" />
            </button>

            <div className="pagesContainer" ref={pageContainerRef}>
              {[...Array(int(data.pages))].map((key, value) => (
                <button className={page === value + 1 ? 'pageSelected' : ''} key={value} onClick={(event: any) => handleChangePage(event.target.offsetLeft, value + 1)}>
                  {value + 1}
                </button>
              ))}
            </div>

            <button onClick={handleNextPage} disabled={!(page < int(data.pages))}>
              <CaretRight size={14} weight="regular" />
            </button>

            <button onClick={handleLastPage} disabled={!(page < int(data.pages))}>
              <CaretDoubleRight size={14} weight="regular" />
            </button>
          </div>
    </Main>
  )
}
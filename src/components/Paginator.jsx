import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

export default function Paginator({ totalPages, center = true }) {
  const outerLimit = 3;
  const innerLimit = 3;
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: totalPages,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: { currentPage: 1 },
  });

  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    >
      <PaginationContainer
        gap={2}
        justifyContent={center && "center"}
        width={center && "100%"}
      >
        <PaginationPrevious>Previous</PaginationPrevious>
        <PaginationPageGroup gap={1}>
          {pages.map((page) => (
            <PaginationPage
              key={`page_${page}`}
              page={page}
              p={2}
              _current={{
                bg: "brand.500",
                color: "white",
                _hover: { bg: "brand.500", color: "white" },
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext>Next</PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
}

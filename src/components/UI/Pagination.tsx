interface IPaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  setCurrentPage,
  currentPage,
  totalItems,
  itemsPerPage,
}: IPaginationProps) {
  if (!totalItems) {
    return null;
  }

  const nbPages = Math.ceil(totalItems / itemsPerPage);

  if (nbPages <= 1) {
    return null;
  }

  let pagesArr = Array.from({ length: nbPages }, (_, i) => i + 1);
  pagesArr = pagesArr.filter((page) => {
    page = Number(page);
    return (
      (page < currentPage + 2 && page > currentPage - 2) ||
      page > nbPages - 2 ||
      page < 3
    );
  });

  const pagesArrDisplayed: Array<string | number> = [];
  for (let i = 0; i < pagesArr.length; i++) {
    const currP = Number(pagesArr[i]);
    pagesArrDisplayed.push(currP); // get page number
    if (pagesArr[i + 1] && currP + 1 !== pagesArr[i + 1]) {
      pagesArrDisplayed.push("..."); // if next page exist & is more than current+1, insert interval
    }
  }

  return (
    <nav className="mt-8 flex items-center justify-between gap-2 sm:gap-3">
      <div>
        {pagesArrDisplayed.map((page, index) => {
          if (page === "...") return <span key={`...${index}`}>...</span>;
          return (
            <button
              key={page}
              className={`size-9 rounded-full font-bold ${
                page === currentPage
                  ? "bg-brand text-xl text-blue-900"
                  : "hover:text-blue-700 cursor-pointer text-gray-500"
              }`}
              onClick={() => setCurrentPage(Number(page))}
            >
              {page}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          className="size-9 group grid place-items-center cursor-pointer bg-grey-menu rounded-full border border-transparent hover:bg-white/10 hover:border-black disabled:pointer-events-none disabled:opacity-0"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          <span
            aria-hidden
            className="size-4 bg-white group-[:hover]:bg-black [mask:url(/src/assets/icon/fleche-droite.svg)_no-repeat_center/contain] rotate-180"
          />
        </button>

        <button
          className="group size-9 grid place-items-center cursor-pointer bg-grey-menu rounded-full border border-transparent hover:bg-white/10 hover:border-black disabled:pointer-events-none disabled:opacity-0"
          onClick={() =>
            setCurrentPage(currentPage < nbPages ? currentPage + 1 : nbPages)
          }
          disabled={currentPage === nbPages}
        >
          <span
            aria-hidden
            className="size-4 bg-white group-[:hover]:bg-black [mask:url(/src/assets/icon/fleche-droite.svg)_no-repeat_center/contain]"
          />
        </button>
      </div>
    </nav>
  );
}

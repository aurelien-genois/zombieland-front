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
    return (
      (page < currentPage + 2 && page > currentPage - 2) ||
      page > nbPages - 2 ||
      page < 3
    );
  });

  return (
    <nav className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
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

      {pagesArr.map((page, index) => {
        if (pagesArr[index + 1] && page + 1 !== pagesArr[index + 1]) {
          return <span key={page + 1}>...</span>;
        } else {
          return (
            <button
              key={page}
              className={`size-9 rounded-full font-bold ${
                page === currentPage
                  ? "bg-brand text-xl text-blue-900"
                  : "hover:text-blue-700 cursor-pointer text-gray-500"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        }
      })}

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
    </nav>
  );
}

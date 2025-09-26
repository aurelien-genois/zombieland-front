interface IPaginationProps {
  currentPage?: number;
  totalItems: number;
  itemsPerPage?: number;
}

// TODO : make it dynamic with activities store
export default function Pagination({
  currentPage = 1,
  totalItems,
  itemsPerPage = 20,
}: IPaginationProps) {
  if (!totalItems) {
    return null;
  }

  const nbPages = Math.ceil(totalItems / itemsPerPage);
  if (nbPages <= 1) {
    return null;
  }

  // TODO update store when currentPage changes

  return (
    <nav className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
      <button className="size-9 grid place-items-center rounded-full hover:bg-white/10">
        <span
          aria-hidden
          className="size-4 bg-white [mask:url(/src/assets/icon/fleche-droite.svg)_no-repeat_center/contain] rotate-180"
        />
      </button>

      {Array.from({ length: nbPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`size-9 rounded-full font-bold ${
            page === currentPage
              ? "bg-brand text-green-text"
              : "hover:bg-white/10"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="size-9 grid place-items-center rounded-full hover:bg-white/10">
        <span
          aria-hidden
          className="size-4 bg-white [mask:url(/src/assets/icon/fleche-droite.svg)_no-repeat_center/contain]"
        />
      </button>
    </nav>
  );
}

import { useAppDispatch } from "@/hooks/redux";

interface IPaginationProps {
  fetchItems: Function;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  fetchItems,
  currentPage,
  totalItems,
  itemsPerPage,
}: IPaginationProps) {
  const dispatch = useAppDispatch();

  if (!totalItems) {
    return null;
  }

  const nbPages = Math.ceil(totalItems / itemsPerPage);

  if (nbPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
      <button
        className="size-9 grid place-items-center bg-black rounded-full hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
        onClick={() =>
          dispatch(
            fetchItems({
              page: currentPage > 1 ? currentPage - 1 : 1,
            })
          )
        }
        disabled={currentPage === 1}
      >
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
          onClick={() => dispatch(fetchItems({ page }))}
        >
          {page}
        </button>
      ))}

      <button
        className="size-9 grid place-items-center bg-black rounded-full hover:bg-white/10 disabled:pointer-events-none disabled:opacity-50"
        onClick={() =>
          dispatch(
            fetchItems({
              page: currentPage < nbPages ? currentPage + 1 : nbPages,
            })
          )
        }
        disabled={currentPage === nbPages}
      >
        <span
          aria-hidden
          className="size-4 bg-white [mask:url(/src/assets/icon/fleche-droite.svg)_no-repeat_center/contain]"
        />
      </button>
    </nav>
  );
}

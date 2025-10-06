import { useRef, useEffect } from "react";
import { useLocation } from "react-router";

interface ISearchFormProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchForm({
  searchQuery,
  setSearchQuery,
  handleSearchSubmit,
}: ISearchFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  useEffect(() => {
    inputRef.current?.focus();
  }, [location.pathname]);

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative w-full sm:w-80 md:w-[22rem]"
    >
      <span
        aria-hidden
        className="absolute left-3 top-1/2 -translate-y-1/2 block w-5 h-5 bg-grey-menu [mask:url(@/assets/icon/loupe.svg)_no-repeat_center/contain]"
      />
      <input
        name="search"
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        placeholder="Rechercher une attraction"
        className="w-full pl-10 pr-3 py-2 text-grey-menu rounded-xl bg-white border border-dark-blue-buttons outline-none placeholder:text-dark-blue-buttons hover:border-blue-border-filter-focus focus:ring-blue-400"
        id="activities-search"
        ref={inputRef}
        aria-label="Rechercher une attraction"
      />
    </form>
  );
}

export default function SearchForm() {
  // TODO update store when search keyword changes

  return (
    <div className="relative w-full sm:w-80 md:w-[22rem]">
      <span
        aria-hidden
        className="absolute left-3 top-1/2 -translate-y-1/2 block w-5 h-5 bg-white/40 [mask:url(/icon/loupe.svg)_no-repeat_center/contain]"
      />
      <input
        type="search"
        placeholder="Rechercher une attraction"
        className="w-full pl-10 pr-3 py-2 rounded-xl bg-black/40 border border-white/10 outline-none placeholder:text-white/40 hover:border-red-border-filter-focus focus:ring-red-border-filter-focus"
      />
    </div>
  );
}

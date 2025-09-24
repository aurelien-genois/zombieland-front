// TODO : make it dynamic with activities store
export default function Pagination() {
  return (
    <nav className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
      <button className="size-9 grid place-items-center rounded-full hover:bg-white/10">
        <span
          aria-hidden
          className="size-4 bg-white [mask:url(/icon/fleche-droite.svg)_no-repeat_center/contain] rotate-180"
        />
      </button>
      <button className="size-9 rounded-full bg-brand text-green-text font-bold">
        1
      </button>
      <button className="size-9 rounded-full hover:bg-white/10">2</button>
      <button className="size-9 rounded-full hover:bg-white/10">3</button>
      <button className="size-9 rounded-full hover:bg-white/10">4</button>

      <button className="size-9 grid place-items-center rounded-full hover:bg-white/10">
        <span
          aria-hidden
          className="size-4 bg-white [mask:url(/icon/fleche-droite.svg)_no-repeat_center/contain]"
        />
      </button>
    </nav>
  );
}

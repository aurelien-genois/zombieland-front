import { useCategories } from "@/hooks/categories";

interface IFilterBarProps {
  ageGroupQuery: number | undefined;
  setAgeGroupQuery: React.Dispatch<React.SetStateAction<number | undefined>>;
  disabledAccessQuery: string | undefined;
  setDisabledAccessQuery: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  highIntensityQuery: string | undefined;
  setHighIntensityQuery: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  categoryQuery: number | undefined;
  setCategoryQuery: React.Dispatch<React.SetStateAction<number | undefined>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  orderQuery: string;
  setOrderQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleReset: () => void;
}

// orderQuery, limit

export default function FilterBar({
  ageGroupQuery,
  setAgeGroupQuery,
  disabledAccessQuery,
  setDisabledAccessQuery,
  highIntensityQuery,
  setHighIntensityQuery,
  categoryQuery,
  setCategoryQuery,
  limit,
  setLimit,
  orderQuery,
  setOrderQuery,
  handleSearchSubmit,
  handleReset,
}: IFilterBarProps) {
  const { categories } = useCategories();

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="flex flex-wrap md:flex-row items-center gap-2">
        <label htmlFor="age_group" className="relative">
          <select
            name="age_group"
            value={String(ageGroupQuery)}
            onChange={(e) =>
              setAgeGroupQuery(
                e.currentTarget.value !== ""
                  ? Number(e.currentTarget.value)
                  : undefined
              )
            }
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
          >
            <option value="">- Niveau de frousse -</option>
            <option value="0">0 Très léger</option>
            <option value="1">1 Léger</option>
            <option value="2">2 Tendu</option>
            <option value="3">3 Très flippant</option>
          </select>
        </label>

        <label htmlFor="hight_intensity">
          <select
            name="hight_intensity"
            value={highIntensityQuery}
            onChange={(e) =>
              setHighIntensityQuery(
                e.currentTarget.value !== "" ? e.currentTarget.value : undefined
              )
            }
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
          >
            <option value="">- Intensité -</option>
            <option value="true">Intense</option>
            <option value="false">Non intense</option>
          </select>
        </label>

        <label htmlFor="disabled_access">
          <select
            name="disabled_access"
            value={disabledAccessQuery}
            onChange={(e) =>
              setDisabledAccessQuery(
                e.currentTarget.value !== "" ? e.currentTarget.value : undefined
              )
            }
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
          >
            <option value="">- Accès PMR -</option>
            <option value="true">Accessible</option>
            <option value="false">Non accessible</option>
          </select>
        </label>

        <label htmlFor="category">
          <select
            name="category"
            value={String(categoryQuery)}
            onChange={(e) => setCategoryQuery(Number(e.currentTarget.value))}
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
          >
            <option value="">- Catégorie -</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        {/* <label htmlFor="limit">
          Nb par page
          <select
            name="limit"
            value={String(limit)}
            onChange={(e) => setLimit(Number(e.currentTarget.value))}
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </label> */}

        {/* <select
          name="order"
          value={orderQuery}
          onChange={(e) => setOrderQuery(e.currentTarget.value)}
          className="appearance-none px-4 pr-9 py-1.5 rounded-xl font-semibold bg-gray-300 text-dark-blue-buttons
                    hover:border-blue-400 transition outline-none
                    focus-visible:ring-blue-300"
        >
          <option value="name:asc">Noms croissants</option>
          <option value="name:desc">Noms décroissants</option>
        </select> */}

        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-xl text-white-bg bg-red-400 hover:brightness-110 font-semibold cursor-pointer"
        >
          Réinitialiser
        </button>
      </form>
    </>
  );
}

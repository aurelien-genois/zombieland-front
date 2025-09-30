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
}: IFilterBarProps) {
  const { categories } = useCategories();

  return (
    <>
      <div className="flex flex-wrap gap-2">
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
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl border border-green-border-filter bg-green-bg-filter text-green-text
                    hover:border-red-border-filter-focus transition outline-none
                    focus-visible:ring-red-100/0"
          >
            <option value="">-</option>
            <option value="0">0 niveau de frousse</option>
            <option value="1">1 léger</option>
            <option value="2">2 tendu</option>
            <option value="3">3 très flippant</option>
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
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl border border-green-border-filter bg-green-bg-filter text-green-text
                    hover:border-red-border-filter-focus transition outline-none
                    focus-visible:ring-red-100/0"
          >
            <option value="">- Niveau d'intensité -</option>
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
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl border border-green-border-filter bg-green-bg-filter text-green-text
                    hover:border-red-border-filter-focus transition outline-none
                    focus-visible:ring-red-100/0"
          >
            <option value="">- Accès PMR -</option>
            <option value="true">Accessible PMR</option>
            <option value="false">Non accessible PMR</option>
          </select>
        </label>

        <label htmlFor="category">
          Catégorie
          <select
            name="category"
            value={String(categoryQuery)}
            onChange={(e) => setCategoryQuery(Number(e.currentTarget.value))}
            className="appearance-none px-4 pr-9 py-1.5 rounded-xl border border-green-border-filter bg-green-bg-filter text-green-text
                    hover:border-red-border-filter-focus transition outline-none
                    focus-visible:ring-red-100/0"
          >
            <option value="">- Catégorie -</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        {/* // TODO RESET */}
        <button
          type="button"
          className="px-3 py-1.5 rounded-xl bg-red-bg-btn hover:brightness-110 font-semibold"
        >
          RÉINITIALISER
        </button>
      </div>
    </>
  );
}

import CardList from "./CardList";
import FilterBar from "./FilterBar";
import Pagination from "@/components/UI/Pagination";
import SearchForm from "./SearchForm";
import { usePublishedActivities } from "@/hooks/activities";
import { fetchPublishedActivities } from "@/store/reducers/activitiesReducer";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { useParams } from "react-router";
import { useCategories } from "@/hooks/categories";

export default function ActivitiesPage() {
  const dispatch = useAppDispatch();
  const params = useParams();

  // TODO optimize auto-filter on category (for example with a "getBySlug" at API side)
  const { categories } = useCategories();
  let categoryIdToFilter = undefined;
  if (params.category !== undefined && typeof params.category === "string") {
    const category = params.category;
    const findCategory = categories.filter((cat) => {
      const dbCategory = cat.name
        .replace(/^\s+|\s+$/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase()
        .replace(/[éèêë]/g, "e")
        .replace(/[ìï]/g, "i")
        .replace(/[ôöò]/g, "o")
        .replace(/[àää]/g, "a")
        .replace(/[ùûü]/g, "u");
      const urlCategory = category
        .replace(/^\s+|\s+$/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase()
        .replace(/[éèêë]/g, "e")
        .replace(/[ìï]/g, "i")
        .replace(/[ôöò]/g, "o")
        .replace(/[àää]/g, "a")
        .replace(/[ùûü]/g, "u");

      return urlCategory === dbCategory;
    });

    if (findCategory.length) {
      categoryIdToFilter = Number(findCategory[0].id);
      // setCategoryQuery(findCategory[0].id);
    }
  }

  const { activities, page, total, loading, error } = usePublishedActivities();

  const [currentPage, setCurrentPage] = useState(page);
  const [limit, setLimit] = useState(9);

  const [searchQuery, setSearchQuery] = useState("");

  const [categoryQuery, setCategoryQuery] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    // if current page url for a category, set filter (that will fetch activities)
    setCategoryQuery(categoryIdToFilter);
  }, [categoryIdToFilter]);

  const [orderQuery, setOrderQuery] = useState("");
  const [ageGroupQuery, setAgeGroupQuery] = useState<number | undefined>(
    undefined
  );
  const [disabledAccessQuery, setDisabledAccessQuery] = useState<
    string | undefined
  >(undefined);
  const [highIntensityQuery, setHighIntensityQuery] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    dispatch(
      fetchPublishedActivities({
        perPage: limit,
        page: currentPage,
        search: searchQuery,
        age_group: ageGroupQuery,
        category_id: categoryQuery,
        disabled_access:
          disabledAccessQuery !== undefined
            ? disabledAccessQuery == "true"
            : undefined,
        high_intensity:
          highIntensityQuery !== undefined
            ? highIntensityQuery == "true"
            : undefined,
        order: orderQuery,
      })
    );
  }, [
    dispatch,
    limit,
    currentPage,
    searchQuery,
    categoryQuery,
    ageGroupQuery,
    disabledAccessQuery,
    highIntensityQuery,
    orderQuery,
  ]);

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchPublishedActivities({
        perPage: limit,
        page: currentPage,
        search: searchQuery,
        age_group: ageGroupQuery,
        category_id: categoryQuery,
        disabled_access:
          disabledAccessQuery !== undefined
            ? disabledAccessQuery == "true"
            : undefined,
        high_intensity:
          highIntensityQuery !== undefined
            ? highIntensityQuery == "true"
            : undefined,
        order: orderQuery,
      })
    );
  };

  const handleReset = async () => {
    setLimit(9);
    setOrderQuery("");
    setSearchQuery("");
    setAgeGroupQuery(undefined);
    setDisabledAccessQuery(undefined);
    setHighIntensityQuery(undefined);
    setCategoryQuery(undefined);
  };

  return (
    <div className="bg-black-bg-main ">
      <main className="pt-16 sm:pt-20  min-h-[calc(100svh-5rem-1.45rem)]">
        <section className="bg-black-bg-main text-white">
          <div className="max-w-7xl mx-auto pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-green-text mb-6">
                TOUTES LES ATTRACTIONS
              </h1>

              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-white/70">{total} résultats</p>
                  <SearchForm
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    handleSearchSubmit={handleSearchSubmit}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <FilterBar
                    ageGroupQuery={ageGroupQuery}
                    setAgeGroupQuery={setAgeGroupQuery}
                    disabledAccessQuery={disabledAccessQuery}
                    setDisabledAccessQuery={setDisabledAccessQuery}
                    highIntensityQuery={highIntensityQuery}
                    setHighIntensityQuery={setHighIntensityQuery}
                    categoryQuery={categoryQuery}
                    setCategoryQuery={setCategoryQuery}
                    limit={limit}
                    setLimit={setLimit}
                    orderQuery={orderQuery}
                    setOrderQuery={setOrderQuery}
                    handleSearchSubmit={handleSearchSubmit}
                    handleReset={handleReset}
                  />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-white">Loading...</div>
            ) : error || !activities ? (
              <div className="text-white">Error: {error}</div>
            ) : activities.length ? (
              <>
                {/* Grille des cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
                  {activities.map((activity) => (
                    <CardList
                      key={activity.id}
                      name={activity.name}
                      slug={activity.slug}
                      slogan={activity.slogan}
                      minimum_age={activity.minimum_age}
                      high_intensity={activity.high_intensity}
                      disabled_access={activity.disabled_access}
                      image_url={activity.image_url}
                    />
                  ))}
                </div>
                <Pagination
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  totalItems={total}
                  itemsPerPage={limit}
                />
              </>
            ) : (
              <p className="text-center">Aucune activité trouvée</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

import "./ActivitiesPage.css";
import CardList from "./CardList";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import SearchForm from "./SearchForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchActivities } from "../../store/reducers/activitiesReducer";
import { useEffect } from "react";

export default function ActivitiesPage() {
  const dispatch = useAppDispatch();

  // Fetch activities on component mount
  useEffect(() => {
    dispatch(fetchActivities({ perPage: 6 }));
  }, [dispatch]);

  // TODO clean up unused variables & console.logs
  const { activities, page, perPage, total, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );
  console.log("Activities Store:", {
    activities,
    page,
    perPage,
    total,
    loading,
    error,
  });

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
                  <p className="text-white/70">24 résultats</p>
                  <SearchForm />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                  <FilterBar />
                </div>
              </div>
            </div>
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
            <Pagination />
          </div>
        </section>
      </main>
    </div>
  );
}

import { useParams } from "react-router";
import ActivityCarousel from "./ActivityCarousel";
import ActivityDetails from "./ActivityDetails";
import "./ActivityPage.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchOneActivity } from "../../store/reducers/activitiesReducer";

export default function ActivityPage() {
  const params = useParams();
  const slug = String(params.slug) || "";

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOneActivity(slug));
  }, [dispatch, slug]);

  const { currentActivity, loading, error } = useAppSelector(
    (state) => state.activitiesStore
  );

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  if (error || !currentActivity) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <>
      {/* // ! Only one image per activity actually ! */}
      <ActivityCarousel
        images={[
          currentActivity.image_url || "/img/activities/zombie4d-interior.png",
          "/img/activities/zombie4d-cover.png",
        ]}
      />
      <ActivityDetails
        name={currentActivity.name}
        categoryId={currentActivity.category_id}
        slogan={currentActivity.slogan}
        description={currentActivity.description}
        minimum_age={currentActivity.minimum_age}
        high_intensity={currentActivity.high_intensity}
        disabled_access={currentActivity.disabled_access}
      />
    </>
  );
}

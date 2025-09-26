import { useParams } from "react-router";
import ActivityCarousel from "./ActivityCarousel";
import ActivityDetails from "./ActivityDetails";
import { useActivity } from "@/hooks/activities";

export default function ActivityPage() {
  const params = useParams();
  const slug = String(params.slug) || "";

  const { currentActivity, loading, error } = useActivity(slug);

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
          currentActivity.image_url ||
            "/src/assets/img/activities/zombie4d-interior.png",
          "/src/assets/img/activities/zombie4d-cover.png",
        ]}
      />
      <ActivityDetails
        name={currentActivity.name}
        categoryName={currentActivity.category.name}
        slogan={currentActivity.slogan}
        description={currentActivity.description}
        minimum_age={currentActivity.minimum_age}
        high_intensity={currentActivity.high_intensity}
        disabled_access={currentActivity.disabled_access}
      />
    </>
  );
}

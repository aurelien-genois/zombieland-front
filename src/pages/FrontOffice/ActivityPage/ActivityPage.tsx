import { useParams } from "react-router";
import ActivityCarousel from "./ActivityCarousel";
import ActivityDetails from "./ActivityDetails";
import { usePublishedActivity } from "@/hooks/activities";
import imageCarousel1 from "@/assets/img/activities/zombie4d-interior.png";
import imageCarousel2 from "@/assets/img/activities/zombie4d-cover.png";

export default function ActivityPage() {
  const params = useParams();
  const slug = String(params.slug) || "";

  const { currentActivity, loading, error } = usePublishedActivity(slug);

  if (loading) {
    return <div className="text-grey-menu">Loading...</div>;
  }
  if (error || !currentActivity) {
    return <div className="text-grey-menu">Error: {error}</div>;
  }

  return (
    <>
      {/* // ! Only one image per activity actually ! */}
      <ActivityCarousel
        images={[
          currentActivity.image_url ||
            imageCarousel1,
          imageCarousel2,
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

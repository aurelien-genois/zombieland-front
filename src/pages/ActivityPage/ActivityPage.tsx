import { useParams } from "react-router";
import ActivityCarousel from "./ActivityCarousel";
import ActivityDetails from "./ActivityDetails";
import "./ActivityPage.css";

export default function ActivityPage() {
  const params = useParams();

  console.log("SLUG", params.slug);

  return (
    <>
      {/* // ! Only one image per activity actually ! */}
      <ActivityCarousel
        images={[
          "/img/activities/zombie4d-interior.png",
          "/img/activities/zombie4d-cover.png",
        ]}
      />
      <ActivityDetails />
    </>
  );
}

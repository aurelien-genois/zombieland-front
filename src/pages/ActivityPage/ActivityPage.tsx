import { useParams } from "react-router";
import ActivityCarousel from "./ActivityCarousel";
import ActivityDetails from "./ActivityDetails";
import "./ActivityPage.css";

export default function ActivityPage() {
  // TODO use params (:slug) to fetch activity details from API
  const params = useParams();
  // params.slug;

  return (
    <>
   
        <ActivityCarousel />
        <ActivityDetails />

    </>
  );
}

import ActivityCarousel from './ActivityCarousel';
import ActivityDetails from './ActivityDetails';
import './ActivityPage.css';

export default function ActivityPage() {
  return(
    <>
      <div className="pt-20">
        <ActivityCarousel />
        <ActivityDetails />
      </div>
    </>
  )
}
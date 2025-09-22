import ActivityCarousel from './ActivityCarousel';
import ActivityDetails from './ActivityDetails';
import './ActivityPage.css';

export default function ActivityPage() {
  return(
    <>
      <div className="pt-20 min-h-[calc(100svh-5rem-1.45rem)]">
        <ActivityCarousel />
        <ActivityDetails />
      </div>
    </>
  )
}
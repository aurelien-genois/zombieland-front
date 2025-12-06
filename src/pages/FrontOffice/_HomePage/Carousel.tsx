import HomeCard from "./HomeCard";
import { usePublishedActivities } from "@/hooks/activities";
import { HSCarousel, type ICarousel } from "preline";
import { useEffect, useRef } from "react";

export default function Carousel() {
  const { activities, loading, error } = usePublishedActivities({ perPage: 6 });

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselRefInstance = useRef<ICarousel | null>(null);

  useEffect(() => {
    if (activities.length === 0 || !carouselRef.current) return;

    // do not .destroy() because Preline will often fail (if not snap for example)
    if (carouselRefInstance.current?.destroy) {
      try {
        carouselRefInstance.current?.destroy();
      } catch (err) {
        console.error("HSCarousel.destroy failed", err);
      }
      carouselRefInstance.current = null;
    }

    // optional micro-delay so children exist and styles are applied
    requestAnimationFrame(() => {
      carouselRefInstance.current = new HSCarousel(
        carouselRef.current as HTMLElement,
        {
          currentIndex: 1,
          loadingClasses: "opacity-0",
          dotsItemClasses:
            "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
          mode: "default",
          isAutoHeight: false,
          isAutoPlay: true,
          isCentered: false,
          isDraggable: true,
          isInfiniteLoop: true,
          isRTL: false,
          isSnap: false,
          hasSnapSpacers: false,
          slidesQty: {
            xs: 1,
            md: 2,
            lg: 3,
          },
          speed: 3000,
          updateDelay: 4,
        }
      );
    });

    return () => {
      // do not .destroy() because Preline will often fail (if not snap for example)
      try {
        carouselRefInstance.current?.destroy?.();
      } catch (err) {
        console.error("HSCarousel.destroy failed", err);
      }
      carouselRefInstance.current = null;
    };
  }, [activities]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }
  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div ref={carouselRef} className="relative hs-carousel">
      <div className="hs-carousel w-full overflow-hidden bg-blue-carousel rounded-lg px-8 shadow-[0px_15px_7px_-8px_rgba(0,_0,_0,_0.1)]">
        <div className="relative min-h-110 -mx-1">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap opacity-0 transition-transform duration-700">
            {activities.map((activity) => (
              <div key={activity.id} className="hs-carousel-slide px-1">
                <div className="flex justify-center h-full bg-blue-carousel p-6 ">
                  <HomeCard
                    key={activity.id}
                    name={activity.name}
                    slug={activity.slug}
                    slogan={activity.slogan}
                    minimum_age={activity.minimum_age}
                    high_intensity={activity.high_intensity}
                    disabled_access={activity.disabled_access}
                    image_url={activity.image_url}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hs-carousel-prev cursor-pointer hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 bg-blue-carousel focus:outline-hidden rounded-s-lg dark:text-grey-text-footer"
      >
        <span className="text-2xl " aria-hidden="true">
          <svg
            className="shrink-0 size-10"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        type="button"
        className="hs-carousel-next cursor-pointer hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 bg-blue-carousel focus:outline-hidden rounded-s-lg dark:text-grey-text-footer"
      >
        <span className="sr-only">Next</span>
        <span className="text-2xl" aria-hidden="true">
          <svg
            className="shrink-0 size-10"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>
    </div>
  );
}

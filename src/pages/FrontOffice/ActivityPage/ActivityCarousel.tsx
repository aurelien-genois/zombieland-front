import { useEffect, useRef } from "react";
import { HSCarousel, type ICarousel } from "preline";

interface IActivityCarouselProps {
  images: string[];
}

export default function ActivityCarousel({ images }: IActivityCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const carouselRefInstance = useRef<ICarousel | null>(null);

  useEffect(() => {
    if (images.length === 0 || !carouselRef.current) return;

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
          isCentered: true,
          isDraggable: true,
          isInfiniteLoop: true,
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
  }, [images]);

  return (
    <>
      <div ref={carouselRef} className="relative hs-carousel">
        <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-black rounded-lg">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            {images.map((imageUrl) => (
              <div
                key={imageUrl}
                className="hs-carousel-slide flex items-center justify-center"
              >
                <img className="object-cover" src={imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-400 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        >
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
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
          className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-400 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
        >
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg
              className="shrink-0 size-5"
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

        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 flex gap-x-2"></div>
      </div>
    </>
  );
}

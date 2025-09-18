import Card from "./HomeCard";

export default function Carousel (){

  return (

    <div data-hs-carousel='{
      "loadingClasses": "opacity-0", "isInfiniteLoop": true,
      "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
      "slidesQty": {
        "xs": 1,
        "md": 2,
        "lg": 3
      }
    }' className="relative">
      <div className="hs-carousel w-full overflow-hidden bg-black-bg-carousel rounded-lg dark:bg-neutral-900 pt-5 ">
        <div className="relative min-h-110 -mx-1">
      
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap opacity-0 transition-transform duration-700">
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
                <Card />
              </div>
            </div>
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
              <Card />
              </div>
            </div>
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
              <Card />
              </div>
            </div>
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
              <Card />
              </div>
            </div>
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
              <Card />
              </div>
            </div>
            <div className="hs-carousel-slide px-1">
              <div className="flex justify-center h-full bg-black-bg-carousel p-6 dark:bg-black-bg-carousel">
              <Card />
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span className="text-2xl" aria-hidden="true">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </span>
        <span className="sr-only">Previous</span>
      </button>
      <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
        <span className="sr-only">Next</span>
        <span className="text-2xl" aria-hidden="true">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </span>
      </button>
    
      <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 gap-x-2"></div>
    </div>
   
  )
}
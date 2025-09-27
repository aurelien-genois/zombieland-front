import Banner from "./Banner";
import Carousel from "./Carousel";
import DirectLink from "./DirectLink";

export default function HomePage() {
  return (
    <>
      <Banner />
      <Carousel />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
          <DirectLink />
          <DirectLink />
        </div>
      </section>
    </>
  );
}

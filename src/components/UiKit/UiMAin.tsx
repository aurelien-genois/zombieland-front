import Banner from '../../pages/HomePage/Banner';
import Carousel from '../../pages/HomePage/Carousel';
import DirectLink from '../../pages/HomePage/DirectLink';
import Footer from './Footer';
import Header from './Header';
import './UiKit.css';

export default function UiMain() {
  return (
    <div className="bg-black-bg-main min-h-dvh">
      <Header />
      <main className="pt-16 sm:pt-20">
        <Banner />
        <Carousel />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6">
            <DirectLink />
            <DirectLink />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

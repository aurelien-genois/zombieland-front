import Banner from './Banner';
import Carousel from './Carousel';
import DirectLink from './DirectLink';
import Footer from './Footer';
import Header from './Header';
import './UiKit.css'

export default function UiMain(){
    return (
       
        <div className='bg-black-bg-main'>
          <Header />
          
          <Banner />
          <Carousel />

          <div className='flex'>
            <DirectLink />
            <DirectLink />
          </div>
          <Footer />
        </div>
    )
}
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-datepicker/dist/react-datepicker.css"

import '../../css/InitialPage.css'

import img1 from '../img/LandingImg1.png'
import img2 from '../img/LandingImg2.jpg'
import img3 from '../img/LandingImg3.jpg'
import img4 from '../img/NewYork.jpg'
import girlImg from '../img/Girl.avif'
import BaloonImg from '../img/Baloon.jpg'
import BoatImg from '../img/Boat.avif'

import Button from '../components/Button'
import Header from '../components/Header_Landing'

import { useTranslation } from "react-i18next"
import { router } from '@inertiajs/react'


export default function Landing() 
{
  const { t } = useTranslation();
  
  const routeChange = () => 
  {
    router.visit(route('home'));
  };


  return (
    <>
      <Header/>

      {/* Top Section */}
      <section className="landing-section d-flex align-items-center py-5">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left: Text + CTA */}
            <div className="col-md-6 text-section mb-4 mb-md-0">
              <h1 className="app-name">TREKORIA</h1>
              <h2 className="main-title">Explore & Book Exciting Activities</h2>
              <p className="lead mb-4">
                Discover adventures, tours, and experiences in cities around the world.
                Find what you love and book instantly.
              </p>
              <Button text="Start Exploring" onClick={(routeChange)} />
            </div>

            {/* Right: Collage of 3 Images */}
            <div className="col-md-6 image-section position-relative d-flex justify-content-end">
              <div className="collage-wrapper position-relative">
                <img src={BaloonImg} alt="Balloon ride" className="collage-img img1 rounded shadow" />
                <img src={girlImg} alt="Traveler" className="collage-img img2 rounded shadow" />
                <img src={BoatImg} alt="Boat activity" className="collage-img img3 rounded shadow" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-lg-3 col-md-6">
              <img
                src={img1}
                className="w-100 rounded shadow"
                alt="New York City"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <img
                src={img2}
                className="w-100 rounded shadow"
                alt="Eiffel Tower, Paris"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <img
                src={img3}
                className="w-100 rounded shadow"
                alt="Tokyo cityscape"
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <img
                src={img4}
                className="w-100 rounded shadow"
                alt="Paris city view"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

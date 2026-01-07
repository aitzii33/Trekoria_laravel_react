import Header from './Header';
import '../assets/CSS/About.css';
import team1 from '../assets/img/team1.png';
import team2 from '../assets/img/team2.png';
import Footer from '../Components/Footer';
export default function AboutUs(){
    return(
      <>
      
    <Header /> {/* stays fixed at the top */}

      <section className="about-gradient py-5 w-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="text-center text-white">
                <h1 className="display-5 fw-bold">About Us</h1>
                <p className="lead">
                  Turning destinations into unforgettable experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="aboutus-secktion paddingTB60">
        <div className="container">
          <div className="row align-items-center">
            
            <div className="col-md-6">
              <br />
              <br />
              <h2 className="strong mb-3">Discover. Book. Experience.</h2>
              <p className="lead mb-4">
                Your gateway to unforgettable activities, wherever you are.
              </p>
              <p>
                We bring together exciting experiences from destinations around the world, making it easy to explore, compare, and book activities that match your interests.
              </p>
            </div>

            <div className="col-md-6">
              <p className="mb-3">
                <br />
                <br />
                <br />
                From adventure and culture to leisure and entertainment, our platform connects you with trusted local providers offering high-quality experiences.
              </p>
              <p>
                With secure payments, transparent pricing, and reliable support, we take care of the details—so you can focus on enjoying every moment.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />



     <div className="stats-section paddingTB60 text-center">
        <div className="container">
          <div className="row">

            <div className="section-a col-md-3 col-sm-6 mb-4">
              <div className="stat-box">
                <h2 className="strong">5+</h2>
                <p>Years of Experience</p>
              </div>
            </div>

            <div className="section-a col-md-3 col-sm-6 mb-4">
              <div className="stat-box">
                <h2 className="strong">10,000+</h2>
                <p>Happy Customers</p>
              </div>
            </div>

            <div className="section-a col-md-3 col-sm-6 mb-4">
              <div className="stat-box">
                <h2 className="strong">95%</h2>
                <p>Trusted Providers</p>
              </div>
            </div>

            <div className="section-a col-md-3 col-sm-6 mb-4">
              <div className="stat-box">
                <h2 className="strong">4.8/5</h2>
                <p>Average Rating</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <br />
      <br />


      <div className="container team-sektion paddingTB60" >
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="strong mb-3" >Our Team</h2>
            <p style={{ color: '#033B63' }}>
              Meet the passionate people behind our platform. We’re dedicated to making every activity experience unforgettable.
            </p>
            <div
              className="border mx-auto"
              style={{ width: '60px', height: '3px', background: '#2796D1', marginTop: '10px' }}
            ></div>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Team Member 1 */}
          <div className="col-md-4 team-box text-center mb-4">
            <div className="team-img thumbnail mb-3">
              <img
                src={team1}
                alt="Umama Shahzadi"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #2796D1'
                }}
              />
            </div>
            <div className="team-content">
              <h4 style={{ color: '#033B63' }}>Umama Shahzadi</h4>
              <div
                className="border-team mx-auto mb-2"
                style={{ width: '40px', height: '2px', background: '#2796D1' }}
              ></div>
              <p style={{ color: '#033B63' }}>
                Co-founder and experience curator. Umama ensures every activity listed is exciting, safe, and unforgettable.
              </p>
              <div className="team-email">
                <a
                  href="mailto:ushahzadi24dw@ikzubirimanteo.com"
                  style={{ color: '#2796D1', textDecoration: 'none', fontWeight: '500' }}
                >
                  ushahzadi24dw@ikzubirimanteo.com
                </a>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-md-4 team-box text-center mb-4">
            <div className="team-img thumbnail mb-3">
              <img
                src={team2}
                alt="Aitziber Gonzalez"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '3px solid #2796D1'
                }}
              />
            </div>
            <div className="team-content">
              <h4 style={{ color: '#033B63' }}>Aitziber Gonzalez</h4>
              <div
                className="border-team mx-auto mb-2"
                style={{ width: '40px', height: '2px', background: '#2796D1' }}
              ></div>
              <p style={{ color: '#033B63' }}>
                Co-founder and tech lead. Aitziber ensures the platform is smooth, reliable, and easy for everyone to use.
              </p>
              <div className="team-email">
                <a
                  href="mailto:agonzalezgo25dw@ikzubirimanteo.com"
                  style={{ color: '#2796D1', textDecoration: 'none', fontWeight: '500' }}
                >
                  agonzalezgo25dw@ikzubirimanteo.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Long Text / Story Section */}
        <section className="long-text-section py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center">
                <h2 className="fw-bold mb-4">
                  Our Story & Vision
                </h2>
                <p className="lead mb-4" style={{ color: '#555', fontSize: '1.1rem' }}>
                  At our core, we believe that every journey is unique, and every experience has a story. From bustling city streets to serene nature escapes, we strive to connect you with unforgettable adventures that leave lasting memories. 
                </p>
                <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8' }}>
                  Founded with a passion for travel and exploration, our platform grew from a simple idea: to make world-class experiences accessible to everyone. We partner with trusted local providers, carefully curating activities to ensure quality, safety, and excitement. 
                </p>
                <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginTop: '1rem' }}>
                  Whether you’re seeking thrill, culture, or relaxation, our goal is to turn every moment into a story worth sharing. We are committed to innovation, sustainability, and community, bringing people together through the joy of discovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />




      </>
    );

}
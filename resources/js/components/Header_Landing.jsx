import logo from '../img/logo.png'
import home from '../img/home.png'

import '../../css/Header.css'

import { router } from '@inertiajs/react' 

import LanguageSelector from '../components/LanguageSelector'



export default function Head({currentLanguage, setLanguage}) 
{  
  const routeInitial = () => 
  {
    router.visit(route('home'));
  };

  const routeAboutUs = () =>
  {
    router.visit(route('about'));
  }

  const routeContact = () => 
  {
    router.visit(route('contact'));
  };


  return (
    <div className="main-content">
      <header className="header">
        {/* Logo */}
        <div>
          <img src={logo} alt="Logo" className="header-logo" style={{ width: "auto", height: "80px" }}/>
        </div>

        {/* Spacer */}
        <div className="header-spacer"></div>


        {/* Spacer */}
        <div className="header-spacer"></div>

        {/* Navigation */}
        <div className="nav-links"></div>

        {/* Navigation */}
        <div className="nav-links">
            <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="me-4 nav-ico" onClick={routeInitial}/>
            <a onClick={routeAboutUs} className="nav-link me-4">About Us</a>
            <a onClick={routeContact} className="nav-link me-4">Contact</a>
        </div>
        
        {/* Language Selector */}
          <div className="me-4">
              <LanguageSelector currentLanguage={currentLanguage} setLanguage={setLanguage} />
          </div>
      
        
      </header>
    
    </div>
  );
}

import logo from '../img/logo.png'
import home from '../img/home.png'

import '../../css/Header.css'

import { Link, router } from '@inertiajs/react'  

import LanguageSelector from '../components/LanguageSelector'



export default function Head({currentLanguage, setLanguage}) 
{  
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
          <Link href="/home" className="nav-link-icon me-4">
            <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="nav-ico"/>
          </Link>
          <Link href="/about" className="nav-link me-4">About Us</Link>
          <Link href="/contact" className="nav-link me-4">Contact</Link>
        </div>
        
        {/* Language Selector */}
          <div className="me-4">
              <LanguageSelector currentLanguage={currentLanguage} setLanguage={setLanguage} />
          </div>
      </header>
    </div>
  );
}

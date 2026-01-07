import logo from '../assets/logo.svg';
import userImg from '../assets/img/DefaultUserImage.png';
import home from '../assets/img/home.png';
import '../assets/CSS/Header.css';
import { useNavigate } from "react-router-dom"
import LanguageSelector from '../Components/LanguageSelector';


export default function Head({currentLanguage, setLanguage}) 
{
  const navigate = useNavigate();
  
  const routeInitial = () => 
  {
    const path = 'Home';
    navigate(path);
  };

  const routeAboutUs = () =>
  {
    const path = '/About';
    navigate(path);
  }

  const routeContact = () => 
  {
    const path = '/ContactUs';
    navigate(path);
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

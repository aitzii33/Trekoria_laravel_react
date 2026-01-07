
import logo from '../assets/logo.svg'
import lupa from '../assets/img/lupa.png'
import userImg from '../assets/img/DefaultUserImage.png'
import home from '../assets/img/home.png'
import '../assets/CSS/Header.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import '../assets/CSS/Header.css';
import LanguageSelector from '../Components/LanguageSelector';

function Head({ isLoggedIn, currentLanguage, setLanguage}) 
{
    //#region navigation part
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const AccessButton = () => 
    {
        if (!isLoggedIn) 
        {
            navigate("/login");
        } 
        else 
        {
            setShowDropdown(prev => !prev);
        }
    };

    const routeInitial = () => 
    {
        navigate('/Home');
    };

    const routeAboutUs = () =>
    {
        navigate('/About');
    }

    const routeContact = () => 
    {
        navigate('/ContactUs');
    };

    const routeProfile = () => 
    {
        navigate('/Profile');
    };

    const routeLogOut = () => 
    {
        //Close the sesion
    };
    const routeLanding =() =>
    {
        navigate('/');
    }
    //#endregion



    return (
        <div className="main-content">
            <header className="header">
                {/* Logo */}
                <div>
                    <img src={logo} alt="Logo" className="header-logo me-2" onClick={routeLanding}/>
                </div>

                {/* Spacer */}
                <div className="header-spacer"></div>

                <div className="search-input">
                    <input type='text' placeholder='Where do you like to go?' id='id_place' style={{ width:'350px'}} />
                    <img src={lupa} alt="search" style={{ height:'60px', width: '60px' }}/>
                </div>

                <div className="header-spacer"></div>

                <div className="nav-links">
                    <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="me-4 nav-ico" onClick={routeInitial}/>
                    <a onClick={routeAboutUs} className="nav-link me-4">About Us</a>
                    <a onClick={routeContact} className="nav-link me-4">Contact</a>
                </div>

                {/* Language Selector */}
                <div className="me-4">
                    <LanguageSelector currentLanguage={currentLanguage} setLanguage={setLanguage} />
                </div>
                {/* Access button */}
                <div className="header-access">
                    <img src={userImg} alt="profile" onClick={AccessButton} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}/>
                    {showDropdown && ( 
                        <ul style={{ position: "absolute", top: "100%", right: 0, background: "white", border: "1px solid #ccc", listStyle: "none", margin: 0, padding: "8px 0" }} >
                            <li onClick={routeProfile}>Perfil</li>
                            <li onClick={routeLogOut}>Cerrar sesión</li>
                        </ul>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Head;
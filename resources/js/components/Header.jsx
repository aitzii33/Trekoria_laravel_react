
import logo from '../img/logo.png'
import lupa from '../img/lupa.png'
import userImg from '../img/DefaultUserImage.png'
import home from '../img/home.png'

import '../../css/Header.css'
import '../../css/Header.css'

import LanguageSelector from '../components/LanguageSelector'

import { useNavigate } from "react-router-dom"
import { router } from '@inertiajs/react' 
import { useState } from "react"

function Head({ isLoggedIn, currentLanguage, setLanguage}) 
{
    //#region navigation part
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const AccessButton = () => 
    {
        if (!isLoggedIn) 
        {
            router.visit(route('login'));
        } 
        else 
        {
            setShowDropdown(prev => !prev);
        }
    }

    const routeInitial = () => 
    {
        router.visit(route('home'));  
    }

    const routeAboutUs = () => 
    {
        router.visit(route('about'));  
    }

    const routeContact = () =>
    {
        router.visit(route('contact'));  
    }

    const routeProfile = () => 
    {
        router.visit(route('profile'));
    }

    const routeLogOut = () => 
    {
        router.post(route('logout')); 
    }

    const routeLanding = () => 
    {
        router.visit(route('landing'));
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
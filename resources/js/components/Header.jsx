
import logo from '../img/logo.png'
import userImg from '../img/DefaultUserImage.png'
import home from '../img/home.png'

import '../../css/Header.css'
import '../../css/Header.css'

import LanguageSelector from '../components/LanguageSelector'

import { router,usePage } from '@inertiajs/react' 
import { useState } from "react"
import { Form, Button, InputGroup } from "react-bootstrap"



function Head({ isLoggedIn, currentLanguage, setLanguage}) 
{
    //#region navigation part
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
        router.visit(route('/home'));  
    }

    const routeAboutUs = () => 
    {
        return Inertia::render('/about', 'About');
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

    const { url } = usePage();
    const showSearchForm = ["/Activity", "/Activity.details"].includes(url);


    const handleSearch = (e) => 
    {
        e.preventDefault();
        const query = e.target.search.value;
        console.log("Search:", query);
        router.visit(route('Activities'));
    };


    return (
        <div className="main-content">
            <header className="header">
                {/* Logo */}
                <div>
                    <img src={logo} alt="Logo" className="header-logo me-2" onClick={routeLanding}/>
                </div>

                {/* Spacer */}
                <div className="header-spacer"></div>
                {showSearchForm && (
                    <Form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control type="text" name="search" placeholder={("Where do you like to go?")} style={{ width: "500px",}}/>
                            <Button variant="primary" type="submit">{("Search")}</Button>
                        </InputGroup>
                    </Form>
                )}

                <div className="header-spacer"></div>

                <div className="nav-links">
                    <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="me-4 nav-ico" onClick={routeInitial}/>
                    <Link href="/about">Ir a About</Link>
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
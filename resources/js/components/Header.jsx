
import logo from '../img/logo.png'
import userImg from '../img/DefaultUserImage.png'
import home from '../img/home.png'

import '../../css/Header.css'
import '../../css/Header.css'

import LanguageSelector from '../components/LanguageSelector'

import { router, usePage , Link} from '@inertiajs/react' 
import { useState } from "react"
import { Form, Button, InputGroup } from "react-bootstrap"



function Head({ isLoggedIn, currentLanguage, setLanguage}) 
{
    //#region navigation part
    const [showDropdown, setShowDropdown] = useState(false);

    const { auth } = usePage().props;

    const toggleDropdown = () => 
    {
        setShowDropdown(!showDropdown);
    };

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
                <Link href="/ ">
                    <img src={logo} alt="Logo" className="header-logo me-2"/>
                </Link>

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
                    <Link href="/home">
                        <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="me-4 nav-ico"/>
                    </Link>

                    <Link href="/about">
                        <a className="nav-link me-4">About Us</a>
                    </Link>

                    <Link href="/contact">
                        <a className="nav-link me-4">Contact</a>
                    </Link>
                </div>

                {/* Language Selector */}
                <div className="me-4">
                    <LanguageSelector currentLanguage={currentLanguage} setLanguage={setLanguage} />
                </div>

                <div className="header-access" onClick={toggleDropdown}>
                {auth.user ? (
                    <>
                        <Link href="/profile">
                            <img src={userImg} alt="profile" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }} />
                        </Link>
                        
                        {showDropdown && (
                            <ul style={{ position: "absolute", top: "100%", right: 0, background: "white", border: "1px solid #ccc", listStyle: "none", margin: 0, padding: "8px 0", borderRadius: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                            <Link href="/profile" style={{ display: "block", padding: "8px 16px", color: "#333", textDecoration: "none" }}>
                                <li>Profile</li>
                            </Link>
                            <Link href="/logout" method="post" style={{ display: "block", padding: "8px 16px", color: "#333", textDecoration: "none" }}>
                                <li>Close session</li>
                            </Link>
                            </ul>
                        )}
                    </>
                ) : (
                    <Link href="/login"> 
                        <img src={userImg} alt="profile" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", cursor: "pointer" }} />
                    </Link>
                )}
                </div>
            </header>
        </div>
    );
}

export default Head;
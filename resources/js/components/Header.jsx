import logo from '../img/logo.png'
import userImg from '../img/DefaultUserImage.png'
import home from '../img/home.png'
import '../../css/Header.css'
import LanguageSelector from '../components/LanguageSelector'
import { router, usePage, Link } from '@inertiajs/react' 
import { useState, useEffect } from "react"
import { Form, Button, InputGroup } from "react-bootstrap"

function Head({ currentLanguage, setLanguage}) 
{
    const [showDropdown, setShowDropdown] = useState(false);
    const hideDropdown = () => setShowDropdown(false);
    const { auth = {}, url } = usePage().props;  

    const toggleDropdown = (e) => 
    {
        e.stopPropagation();
        setShowDropdown((prev) => !prev);
    };

    useEffect(() => 
    {
        const handleClickOutside = () => setShowDropdown(false);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const showSearchForm = ["/Activity", "/Activity.details"].includes(url);
    const handleSearch = (e) => 
    {
        e.preventDefault();
        const query = e.target.search.value;
        console.log("Search:", query);
        router.visit('/activities'); 
    };

    return (
        <div className="main-content">
            <header className="header">
                {/* Logo */}
                <Link href="/">
                    <img src={logo} alt="Logo" className="header-logo me-2"/>
                </Link>

                {/* Spacer */}
                <div className="header-spacer"></div>
                
                {showSearchForm && (
                    <Form onSubmit={handleSearch}>
                        <InputGroup>
                            <Form.Control type="text" name="search" placeholder="Where do you like to go?" style={{ width: "500px" }}/>
                            <Button variant="primary" type="submit">Search</Button>
                        </InputGroup>
                    </Form>
                )}

                <div className="header-spacer"/>

                <div className="nav-links">
                    <Link href="/home">
                        <img src={home} alt="Home" style={{ width: "20px", height: "20px" }} className="me-4 nav-ico"/>
                    </Link>

                    <Link href="/about" className="nav-link me-4">
                        About Us
                    </Link>

                    <Link href="/contact" className="nav-link me-4">
                        Contact
                    </Link>
                </div>

                {/* Language Selector */}
                <div className="me-4">
                    <LanguageSelector currentLanguage={currentLanguage} setLanguage={setLanguage} />
                </div>

                {/* User Menu */}
                <div className="header-access" style={{ position: 'relative' }} onClick={toggleDropdown}>
                    {auth.user ? (
                        <>
                            <img src={userImg} alt="profile" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}}/>

                            {showDropdown && (
                                <ul style={{ position: 'absolute', top: '100%', right: 0, background: 'white', border: '1px solid #ccc', 
                                            listStyle: 'none', margin: 0, padding: 0, borderRadius: '4px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                                            zIndex: 1000, minWidth: '150px' }} onClick={(e) => e.stopPropagation()}>
                                <li>
                                    <Link href="/profile" onClick={hideDropdown} style={{ display: 'block', padding: '12px 16px', color: '#333', 
                                        textDecoration: 'none' }} > Profile </Link>
                                </li>
                                <li>
                                    <Link href="/logout" method="post" onClick={hideDropdown} style={{ display: 'block', padding: '12px 16px', 
                                        color: '#dc3545', textDecoration: 'none', fontWeight: 500 }}> Close session </Link>
                                </li>
                                </ul>
                            )}
                        </>
                    ) : (
                        <Link href="/login">
                            <img src={userImg} alt="login" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />
                        </Link>
                    )}
                    </div>
            </header>
        </div>
    );
}

export default Head;

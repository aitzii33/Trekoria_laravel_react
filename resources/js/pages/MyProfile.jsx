import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'  

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import '../../css/Profile.css'
import "bootstrap/dist/css/bootstrap.min.css"

import Userimg from '../img/Girl.avif'; 


function Profile() //{ userData }
{
    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        username: 'devUser',
        fullName: 'Shannon Doe',
        birthDate: '1998-05-12',
        email: 'shannon@example.com',
        image: Userimg,
    });

    const [tempData, setTempData] = useState(userData);

    useEffect(() => {
        setTempData(userData);
    }, [userData]);

    const handleEdit = () => 
    {
        setTempData(userData);
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePic') 
        {
            const file = files[0];
            if (file) 
            {
                const imageUrl = URL.createObjectURL(file);
                setTempData({ ...tempData, image: imageUrl }); 
            }
        } 
        else
        {
            setTempData({ ...tempData, [name]: value });
        }
    };

    const handleSave = (e) =>
    {
        e.preventDefault();
        setUserData(tempData);
        setIsEditing(false);
    };

    const handleCancel = () => 
    {
        setIsEditing(false);
    };

    if (!userData.image) 
    {
        return (<div>Loading...</div>);
    }

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="container">
                    <div className={`card profile-card ${isEditing ? 'edit-mode' : ''}`}>
                        <div className="profile-header text-center">
                            <img src={isEditing ? tempData.image : userData.image} alt="Profile" className="profile-avatar mx-auto d-block"/>
                            <p className="mb-0 mb-2 mt-3 fw-bold" style={{ color: '#5A4C29' }}>
                                {isEditing ? tempData.username : userData.username}
                            </p>
                            <p className="mb-0 mb-2 mt-3 text-center fw-bold" style={{ color: '#5A4C29' }}>
                                {isEditing ? tempData.email : userData.email}
                            </p>
                        </div>

                        <div className="card-body p-4">
                            {!isEditing ? (
                                <>
                                    <div className="text-center mb-4">
                                        <div className="profile-info">
                                            <strong>Complete name:</strong> {userData.fullName}
                                        </div>

                                        <div className="profile-info">
                                            <strong>Birth date:</strong>{' '}
                                            {new Date(userData.birthDate).toLocaleDateString('es-ES')}
                                        </div>
                                    </div>

                                    <div className="profile-buttons-center mt-4">
                                        <Link href="/home" className="btn btn-secondary profile-btn">
                                            Return to home
                                        </Link>
                                        
                                        <button className="btn btn-save profile-btn" onClick={handleEdit}>
                                            Edit profile
                                        </button>
                                        
                                        <form action="/profile/delete" method="POST" className="d-inline">
                                            <button type="submit" className="btn btn-edit profile-btn">
                                                Delete profile
                                            </button>
                                        </form>

                                        <form action="/logout" method="POST" className="d-inline">
                                            <button type="submit" className="btn btn-secondary profile-btn">
                                                Log out
                                            </button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleSave}>
                                      <div className="mb-4">
                                        <label className="form-label fw-bold">Profile image</label>
                                        <input type="file" name="profilePic" className="form-control" accept="image/*" onChange={handleChange}/>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">User name</label>
                                            <input type="text" name="username" className="form-control" value={tempData.username} onChange={handleChange} required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Email</label>
                                            <input type="email" name="email" className="form-control" value={tempData.email} onChange={handleChange} required/>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Complete name</label>
                                            <input type="text" name="fullName" className="form-control" value={tempData.fullName} onChange={handleChange} required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Birth date</label>
                                            <input type="date" name="birthDate" className="form-control" value={tempData.birthDate} onChange={handleChange} required/>
                                        </div>
                                    </div>

                                    <div className="profile-buttons">  
                                        <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                                            Cancel
                                        </button>

                                        <form action="/profile/modify" method="POST" className="d-inline">
                                            <button type="submit" className="btn btn-save">
                                                Save changes
                                            </button>
                                        </form>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Profile;

import { useState } from 'react'
import { Link } from '@inertiajs/react'  

import '../../css/Profile.css'

import Userimg from '../img/Girl.avif'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

function Profile() 
{
    const [userData, setUserData] = useState({
        username: 'devUser',
        fullName: 'Shannon Doe',
        birthDate: '1998-05-12',
        email: 'shannon@example.com',
        profilePic: Userimg,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [tempData, setTempData] = useState(userData);

    const handleEdit = () => 
    {
        setTempData(userData);
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => 
    {
        const { name, value, files } = e.target;
        if (name === 'profilePic') 
        {
            const file = files[0];
            if (file) 
            {
                const imageUrl = URL.createObjectURL(file);
                setTempData({ ...tempData, profilePic: imageUrl });
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

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="container">
                    <div className={`card profile-card ${isEditing ? 'edit-mode' : ''}`}>
                        <div className="profile-header text-center">
                            <img src={isEditing ? tempData.profilePic : userData.profilePic} alt="Profile" className="profile-avatar mx-auto d-block"/>
                            <p className="mb-0 mb-2 mt-3 text-center fw-bold" style={{ color: '#5A4C29' }}>
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

                                    <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                        <button className="btn btn-edit" onClick={handleEdit}>
                                            Edit profile
                                        </button>

                                        <Link href="/home">
                                            <button className="btn btn-secondary">
                                                Return to home
                                            </button>
                                        </Link>

                                        <form action="/profile/delete" method="POST">
                                            <button type="submit" className="btn btn-save">
                                                Delete profile
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

                                    <div className="d-flex justify-content-between mt-4">
                                        <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                                            Cancel
                                        </button>

                                        <form action="/profile/modify" method="POST">
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

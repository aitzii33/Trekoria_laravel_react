import { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'  
import { Inertia } from '@inertiajs/inertia'

import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import '../../css/Profile.css'
import "bootstrap/dist/css/bootstrap.min.css"

import Userimg from '../img/Girl.avif'

function Profile() 
{
    const { userdata } = usePage().props;

    const [isEditing, setIsEditing] = useState(false);

    const [userData, setUserData] = useState({
        name: userdata?.name || 'Maria',
        last_name: userdata?.last_name || 'lopez',
        fullName: userdata?.name + userdata?.last_name || 'Maria Lopez',
        user_name: userdata?.user_name || 'malopez',
        birthDate: userdata?.birthDate || '12/03/1998',
        email: userdata?.email || 'maria.lopez@example.com',
        image: userdata?.image || Userimg, 
    });

    const [tempData, setTempData] = useState(userData);

    useEffect(() => 
    {
        setTempData(userData);
    }, [userData]);

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
        Inertia.post('/profile/modify', tempData);
        setUserData(tempData);
        setIsEditing(false);
    };

    const handleCancel = () => 
    {
        setIsEditing(false);
    };

    const handleDelete = (e) => 
    {
        e.preventDefault(); 
        if (confirm('Are you sure you want to delete your profile?')) 
        {
            Inertia.post('/profile/delete');
        }
    };


    const handleLogout = (e) => 
    {
        e.preventDefault(); 
        Inertia.post('/profile/logout'); 
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
                            <img src={tempData.image || Userimg} alt="Profile" className="profile-avatar mx-auto d-block"/>
                            <p className="mb-0 mb-2 mt-3 fw-bold" style={{ color: '#5A4C29' }}>
                                {tempData.user_name}
                            </p>
                            <p className="mb-0 mb-2 mt-3 text-center fw-bold" style={{ color: '#5A4C29' }}>
                                {tempData.email}
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
                                            {userData.birthDate ? new Date(userData.birthDate).toLocaleDateString('es-ES') : ''}
                                        </div>
                                    </div>

                                    <div className="profile-buttons-center mt-4">
                                        <Link href="/home" className="btn btn-secondary profile-btn">
                                            Return to home
                                        </Link>
                                        
                                        <button className="btn btn-save profile-btn" onClick={handleEdit}>
                                            Edit profile
                                        </button>
                                        
                                        <button onClick={handleDelete} className="btn btn-edit profile-btn">
                                            Delete profile
                                        </button>

                                        <button onClick={handleLogout} className="btn btn-secondary profile-btn">
                                            Log out
                                        </button>
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
                                            <input type="text" name="username" className="form-control" value={tempData.user_name} onChange={handleChange} required/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Email</label>
                                            <input type="email" name="email" className="form-control" value={tempData.email} onChange={handleChange} required/>
                                        </div>
                                    </div>

                                    <div className="row g-3 mt-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Name</label>
                                            <input type="text" name="last_name" className="form-control" value={tempData.name} onChange={handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Last name</label>
                                            <input type="text" name="fullName" className="form-control" value={tempData.last_name} onChange={handleChange}/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold">Birth date</label>
                                            <input type="date" name="birthDate" className="form-control" value={tempData.birthDate} onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div className="profile-buttons">  
                                        <button type="button" className="btn btn-cancel profile-btn" onClick={handleCancel}>
                                            Cancel
                                        </button>

                                        <button type="submit" className="btn btn-save profile-btn">
                                            Save changes
                                        </button>
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

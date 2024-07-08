
import {useState, useEffect} from 'react';
import { PhoneIcon, MailIcon, TickFilledIcon, CrossFilledIcon } from '../../../components/icons';
import { ImageApi } from '../../../api/image';
import { UserApi } from '../../../api/user';
import { Utility } from '../../../utils/utility';
import { getID, setProfile } from '../../../utils/localstorage';
import Loader from '../../../components/Loader/Loader';
import './UserProfile.scss';


function EditForm() {
    

    

    return (
        <>
        </>
    );
}

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);

            try {
                const userId = getID();
                if (userId) {
                    const { statusCode, data } = await UserApi.getProfile();
                    if (statusCode === 200) {
                        setProfile(data); // Ensure setProfile is properly defined
                        setUserInfo(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching user profile", error);
            }
            setLoading(false);

        };
        fetchUserProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (!userInfo) {
        return <div>Error loading profile. Please try again later.</div>;
    }
    return (
        <>
            <div className="profile-container">
                <div className="title">
                    <h2>User Profile</h2>
                </div>
                <div className="subcontainer">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={userInfo.image === "null"? "/profile.png": ImageApi.GetStaticProfileImage(userInfo.image)} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <h3>{userInfo.username}</h3>
                            <p className='joined'>{Utility.formatDate(userInfo.created_at)}</p>
                            <div className='email'>
                                <MailIcon />
                                <p>{userInfo.email}</p>
                            </div>
                            <div className='phone'>
                                <PhoneIcon />
                                <p>{userInfo.phone_number}</p>
                            </div>
                            <div className={userInfo.is_verified ? "verified": "unverified"}>
                                {userInfo.is_verified?<TickFilledIcon /> : <CrossFilledIcon />}
                                <p>{userInfo.is_verified?"Verified":"Unverified"}</p>
                            </div>

                        </div>
                        
                    </div>
                    <EditForm />
                </div>
            </div>
            
        </>
    );
}

export default UserProfile;
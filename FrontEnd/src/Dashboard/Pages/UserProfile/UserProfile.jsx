
import {useState, useEffect, useContext} from 'react';
import {StoreContext} from '../../../context/StoreContext';
import { PhoneIcon, MailIcon, TickFilledIcon, CrossFilledIcon } from '../../../components/icons';
import './UserProfile.scss';
import { jwtDecode } from 'jwt-decode';

function EditForm() {
    const {userInfo, setUserInfo} = useContext(StoreContext);
    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");


    return (
        <>
        </>
    );
}

function UserProfile() {
    const {userInfo, setUserInfo, token, loading} = useContext(StoreContext);
    const [error, setError] = useState(null);
    const [fetching, setFetching] = useState(false);



    return (
        <>
            {loading || fetching ?
                <div className="loading">
                    <div className="loader">loading</div>
                </div>
                : 
                <div className="profile-container">
                    {/* <div className="title">
                        <h2>User Profile</h2>
                    </div> */}
                    <div className="subcontainer">
                        <div className="profile">
                            <div className="profile-image">
                                <img src={userInfo.image === "null"? "/profile.png": GetStaticProfileImage(userInfo.image)} alt="Profile" />
                            </div>
                            <div className="profile-info">
                                <h3>{userInfo.username}</h3>
                                <p className='joined'>{formatDate(userInfo.created_at)}</p>
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
            }
        </>
    );
}

export default UserProfile;
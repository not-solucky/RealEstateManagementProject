
import {useState, useEffect} from 'react';
import { PhoneIcon, MailIcon, TickFilledIcon, CrossFilledIcon } from '../../../components/icons';
import { ImageApi } from '../../../api/image';
import { UserApi } from '../../../api/user';
import { Utility } from '../../../utils/utility';
import { getID, setProfile } from '../../../utils/localstorage';
import Loader from '../../../components/Loader/Loader';
import './UserProfile.scss';

function EditPassword() {
    const [newpassword, setNewpassword] = useState("");
    const [currentpassword, setCurrentPassword] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        setStatus("loading");
        const ID = getID();

        const {statusCode, data} = await UserApi.updatePassword({
            id: parseInt(ID),
            old_password: currentpassword,
            new_password: newpassword
        });

        if (statusCode === 200) {
            setStatus("success");
            setMessage("Password updated successfully");
        }
        else {
            setStatus("error");
            setMessage(data.error);
        }
    }
    return (
        <>
            <div className="updateItem">
                <h3>Update Password</h3>
                <div className="form-input">
                    <label htmlFor="newpassword">New Password</label>
                    <input type="password" id="newpassword" name="newpassword" placeholder="New Password" 
                    onChange={(event) => setNewpassword(event.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor = "currentpassword">Current Password</label>
                    <input type="password" id="currentpassword" name="currentpassword" placeholder="Current Password"
                    onChange={(event) => setCurrentPassword(event.target.value)} />
                </div>
                <div className="button">
                    <button onClick={handleSubmit}>Submit</button>
                    {status === "loading" &&  <p>Loading...</p> }
                    {status === "success" && <p className="success">{message}</p>}
                    {status === "error" && <p className="error">{message}</p>}
                </div>
                

            </div>
        </>
    );
}

function EditEmail() {
    const [email, setEmail] = useState("");
    const [currentpassword, setCurrentPassword] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        setStatus("loading");
        const ID = getID();

        const {statusCode, data} = await UserApi.updateEmail({
            id: parseInt(ID),
            email: email,
            password: currentpassword
        });

        if (statusCode === 200) {
            setStatus("success");
            setMessage("Email updated successfully");
        }
        else {
            setStatus("error");
            setMessage(data.error);
        }
    }
    return (
        <>
            <div className="updateItem">
                <h3>Update Email</h3>
                <div className="form-input">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Email" 
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor = "currentpassword">Current Password</label>
                    <input type="password" id="currentpassword" name="currentpassword" placeholder="Current Password"
                    onChange={(event) => setCurrentPassword(event.target.value)} />
                </div>
                <div className="button">
                    <button onClick={handleSubmit}>Submit</button>
                    {status === "loading" &&  <p>Loading...</p> }
                    {status === "success" && <p className="success">{message}</p>}
                    {status === "error" && <p className="error">{message}</p>}
                </div>
                

            </div>
        </>
    );
}
function EditName() {
    const [username, setUsername] = useState("");
    const [currentpassword, setCurrentPassword] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        setStatus("loading");
        const ID = getID();

        const {statusCode, data} = await UserApi.updateUsername({
            id: parseInt(ID),
            username: username,
            password: currentpassword
        });

        if (statusCode === 200) {
            setStatus("success");
            setMessage("Username updated successfully");
        }
        else {
            setStatus("error");
            setMessage(data.error);
        }
    }
    return (
        <>
            <div className="updateItem">
                <h3>Update Name</h3>
                <div className="form-input">
                    <label htmlFor="username">Name</label>
                    <input type="text" id="username" name="username" placeholder="Name" 
                    onChange={(event) => setUsername(event.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor = "currentpassword">Current Password</label>
                    <input type="password" id="currentpassword" name="currentpassword" placeholder="Current Password"
                    onChange={(event) => setCurrentPassword(event.target.value)} />
                </div>
                <div className="button">
                    <button onClick={handleSubmit}>Submit</button>
                    {status === "loading" &&  <p>Loading...</p> }
                    {status === "success" && <p className="success">{message}</p>}
                    {status === "error" && <p className="error">{message}</p>}
                </div>
                

            </div>
        </>
    );
}
function EditPhone() {
    const [phone, setPhone] = useState("");
    const [currentpassword, setCurrentPassword] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        setStatus("loading");
        const ID = getID();

        const {statusCode, data} = await UserApi.updatePhone({
            id: parseInt(ID),
            phone: phone,
            password: currentpassword
        });

        if (statusCode === 200) {
            setStatus("success");
            setMessage("Phone updated successfully");
        }
        else {
            setStatus("error");
            setMessage(data.error);
        }
    }
    return (
        <>
            <div className="updateItem">
                <h3>Update Phone Number</h3>
                <div className="form-input">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" id="phone" name="phone" placeholder="Phone Number" 
                    onChange={(event) => setPhone(event.target.value)}/>
                </div>
                <div className="form-input">
                    <label htmlFor = "currentpassword">Current Password</label>
                    <input type="password" id="currentpassword" name="currentpassword" placeholder="Current Password"
                    onChange={(event) => setCurrentPassword(event.target.value)} />
                </div>
                <div className="button">
                    <button onClick={handleSubmit}>Submit</button>
                    {status === "loading" &&  <p>Loading...</p> }
                    {status === "success" && <p className="success">{message}</p>}
                    {status === "error" && <p className="error">{message}</p>}
                </div>
                

            </div>
        </>
    );
}
function EditForm() {

    return (
        <>
            <div className="editForm-container">
                <EditName />
                <EditEmail />
                <EditPassword />
                <EditPhone />
                
            </div>
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
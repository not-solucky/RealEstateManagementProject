
import {useState, useEffect, useRef} from 'react';
import { PhoneIcon, MailIcon, TickFilledIcon, CrossFilledIcon } from '../../../components/icons';
import { ImageApi } from '../../../api/image';
import { UserApi } from '../../../api/user';
import { Utility } from '../../../utils/utility';
import { getID, setProfile } from '../../../utils/localstorage';
import Loader from '../../../components/Loader/Loader';
import {Cropper} from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
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


function UserImageUploadModal({ onClose, onUpload }) {
    const [image, setImage] = useState('');
    const cropperRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const userId = getID();
    const [success, setSuccess] = useState(false);


    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUpload = async () => {
        setLoading(true);
        const cropper = cropperRef.current;
        
        if (cropper) {
            const image = cropper.getCanvas().toDataURL(); // Assuming you want the image data URL
            console.log(image);

            try {
                
                const base64Image = image.split(',')[1];
    
                // Call the updateImage function from UserApi
                const { statusCode, data } = await UserApi.updateImage({
                    id: parseInt(userId),
                    image: base64Image
                });


                if (statusCode === 200) {
                    setMessage('Image uploaded successfully');
                    setSuccess(true);
                } else {
                    setMessage(`Failed to upload image: ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                setMessage(`Error uploading image: ${error.message}`);
            }
        } else {
            setMessage("Please select an image to upload");
        }

        setLoading(false);
    };

    const handleCancel = () => {
        setImage(null);
        onClose();
    };

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Upload Profile Image</h2>
                    </div>
                    
                    {success ? (
                        <div className="success">
                            <p>Image uploaded successfully</p>
                        </div>

                    ):(
                        <div className="image-upload">
                            <div className="input">
                                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                <label htmlFor="image">Choose Image</label>
                            </div>
                            <div className="preview">
                            {image ? (
                                <div className="image-container">
                                    <Cropper
                                        ref={cropperRef}
                                        src={image}
                                        className="cropper"
                                        style={{ height: 300, width: 400 }}
                                        cropperOptions={{
                                            aspectRatio: 1, // Set aspect ratio to 1:1 (optional)

                                        }}
                                        aspectRatio={1/1}
                                    />
                                </div>
                            ) : (
                                <div className="no-image">
                                    <p>No image selected</p>
                                </div>
                            ) }
                            </div>

                            {loading && <div className='no-image'><p>Loading...</p></div>}
                        
                            {message && <p className="error">{message}</p>}
                        
                        </div>

                    )}

                    
                    <div className="button-container">
                        {success ? (
                            <button onClick={onClose}>Close</button>
                        ):(
                            <>
                                <button onClick={handleUpload}>Upload</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);


    const onClose = () => {
        setModalOpen(false);
    };

    const onOpen = () => {
        setModalOpen(true);
    };

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
                            <button className="modal-button"
                                    onClick={onOpen}>
                                <span>Edit</span>
                            </button>
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

                    {modalOpen && <UserImageUploadModal onClose={onClose}/>}
                </div>
            </div>
            
        </>
    );
}

export default UserProfile;
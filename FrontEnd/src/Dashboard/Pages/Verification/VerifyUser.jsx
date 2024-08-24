import "./Verification.scss"
import { useState, useEffect } from "react";
import { UserApi } from '../../../api/user';
import { ImageApi } from '../../../api/image';
import { Utility } from '../../../utils/utility';
import ImageViewer from "../../../components/ImageViewer/Imageviewer";
function VerifyUserPage() {
    const [users, setusers] = useState([]);
    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");
    const [showUser, setShowUser] = useState(false);
    const [UserId, setUserId] = useState(null);
    const [docID, setDocID] = useState(null);

    const GetUser = async () => {
        setMessage("Loading...");
        const { statusCode, data } = await UserApi.DashGetPendingUsers(1);
        if (statusCode === 200) {
            setusers(data.users);
            console.log(data.users)
            setCount(data.count)
            if (count === 0) {
                setMessage("No User Found");
            } else {
                setMessage("");
            }
        } else {
            setMessage(data.error);
        }
    };
    useEffect(() => {
        GetUser();
    }, []);

    return (
        <>
            <div className="verification-container">
                <div className="title">
                    <h2>Pending User Verification</h2>
                </div>
                <div className="subcontainer">
                    {count === 0 && <p>No Active Listings</p>}
                    {
                        showUser ? <UserView setShowUser={setShowUser} setUserInfo = {setUserId} UserInfo = {UserId} docID={docID}/> :
                        <CardContainer users={users} setShowUser={setShowUser} setUserInfo={setUserId} setDocId = {setDocID}/>
                    }
                </div>
            </div>
        </>
    );
}

function CardContainer({ users, setShowUser, setUserInfo, setDocId }) {
    return (
        <div className="card-container">
            {users.map((User) => (
                <UserCard key={User.user_id} User={User} setShowUser={setShowUser} setUserInfo={setUserInfo} setDocID={setDocId}/>
            ))}
        </div>
    );
}
function UserCard ({User, setShowUser, setUserInfo, setDocID}) {
    const handleClick = () => {
        setShowUser(true);
        setUserInfo(User.user_id);
        setDocID(User.document_id);
    }
    return (
        <div className="card">
            <div className="card-image profile">
                <img src={User.image === "null"? "/profile.png": ImageApi.GetStaticProfileImage(User.image)} alt={User.username} />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{User.username}</h3>
                </div>
                <div className="description">
                    <p>{User.email}</p>
                    <p>{User.phone_number}</p>
                </div>
                
                <div className="card-footer">
                    <div className="price-box">
                        <p>Joined</p>
                        <h2 className="date">{Utility.formatDate(User.created_at)}</h2>
                    </div>
                    <button onClick={handleClick} >Expand to verify</button>
                </div>
            </div>
        </div>
    )
}

function UserView({ setShowUser,setUserInfo, UserInfo, docID }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const GetUser = async () => {
        setLoading(true);   
        const { statusCode, data } = await UserApi.getUserById(UserInfo);
        if (statusCode === 200) {
            setUser(data);
        } else {
            console.log(data.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        GetUser();
    }, [UserInfo]);

    
    return (
        <>
            <div className="header">
                <button onClick={() => {setShowUser(false); setUserInfo(null)}}>Back</button>
            </div>
            <div className="content-body">
                {loading ? 
                    <div className="loading">
                        <h2>Loading...</h2>
                    </div> : (
                    <div className="card margin-20">
                        <div className="card-image profile">
                            <img src={user.image === "null"? "/profile.png": ImageApi.GetStaticProfileImage(user.image)} alt={user.username} />
                        </div>
                        <div className="card-content">
                            <div className="card-title">
                                <h3>{user.username}</h3>
                            </div>
                            <div className="description">
                                <p>{user.email}</p>
                                <p>{user.phone_number}</p>
                            </div>
                            
                            <div className="card-footer">
                                <div className="price-box">
                                    <p>Joined</p>
                                    <h2 className="date">{Utility.formatDate(user.created_at)}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <VerificationBox docID={docID} pID={UserInfo} />

            </div>

        </>
    )
}

function VerificationBox({ docID, pID }) {
    const [image, setImage] = useState(null);
    const [rejectMessage, setRejectMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [success, setSuccess] = useState(false);

    const getUser = async () => {
        setLoading(true);
        try {
            const { statusCode, data } = await UserApi.GetDocument(docID);
            if (statusCode === 200) {
                setImage(data.image);
                setError("");
            } else {
                setError(data.error || "Failed to fetch document details.");
            }
        } catch (error) {
            setError("An unexpected error occurred while fetching the document.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (docstatus) => {
        if (docstatus === "rejected" && rejectMessage.trim() === "") {
            setError("Please provide a rejection message.");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                user_id: pID,
                status: docstatus,
                message: docstatus === "rejected" ? rejectMessage : null,
            };
            const { statusCode, data } = await UserApi.updateVerificationUser(payload);
            if (statusCode === 200) {
                setError(""); 
                setSuccess(true);
            } else {
                setError(data.error || "An error occurred during the update.");
            }
        } catch (error) {
            setError("An unexpected error occurred during the update.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [docID]);

    return (
        <div className="verification-box">
            <div className="title-box">
                <h2>Verification</h2>
            </div>
            <div className="content">
                {loading ? (
                    <div className="loading">
                        <p>Loading...</p>
                    </div>
                ) : success ? (
                    <div className="success">
                        <p>User document has been {rejectMessage ? "rejected" : "approved"} successfully.</p>
                    </div>
                ) : 
                (
                    <>
                        {image && (
                            <>
                                <div className="document">
                                    <div className="dropdown">
                                        <button onClick={() => setShowImage(!showImage)}>View Document</button>
                                        {showImage && (
                                            <div className="image">
                                                <img src={ImageApi.GetStaticUserDocumentImage(image)} alt="document" />
                                                <button onClick={() => setToggle(true)}>Enlarge Image</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="message-box">
                                    <label>Rejection Message</label>
                                    <textarea value={rejectMessage} onChange={(e) => setRejectMessage(e.target.value)} maxLength={2000}></textarea>
                                </div>
                                <div className="footer">
                                    <button onClick={() => handleApprove('approved')}>Approve</button>
                                    <button onClick={() => handleApprove('rejected')}>Reject</button>
                                </div>
                                {toggle && (
                                    <ImageViewer
                                        src={ImageApi.GetStaticUserDocumentImage(image)}
                                        onClose={() => setToggle(false)}
                                    />
                                )}
                                {error && <div className="error"><p>{error}</p></div>}
                                
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default VerifyUserPage;
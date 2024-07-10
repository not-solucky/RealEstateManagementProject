import "./Verifyuser.scss"
import { useState } from "react";

function UserRow({ user }) {
    return (
        <div className="user-row">
            <div className="header">
                <div className="header-item">{user.user_id}</div>
                <div className="header-item">{user.username}</div>
            </div>

            <div className="body">
                <div className="item">
                    <p>{user.email}</p>
                </div>
                <div className="item expanded">
                    <p>Document</p>
                </div>
            </div>
            <div className="footer">
                <div className="button">
                    <button>Approve</button>
                </div>
                <div className="button ">
                    <button className="reject">Reject</button>
                </div>
            </div>
            
        </div>
    );
}

function Mapuser({ users }) {
    return (
        <>
            {users.map((user) => (
                <UserRow key={user.user_id} user={user} />
            ))}
        </>
    )
}


function VerifyUserPage() {
    const [users, setUsers] = useState([
        {
            user_id: 2,
            username: "Rakibul Hasan Rafi",
            email: "rafi@nestnavigator.com",


        }
    ]);
    return (
        <>
            <div className="verifyUser-container">
                <div className="title">
                    <h2>Pending Verification</h2>
                </div>
                <div className="subcontainer">
                    <div className="alluser">
                        <Mapuser users={users} />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default VerifyUserPage;
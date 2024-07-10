import Loader from "../../../components/Loader/Loader";
import ErrorComponent from "../../../components/Error/Error";
import { UserApi } from "../../../api/user";
import { useEffect, useState } from "react";
import "./AllUser.scss";

function UserRow({ user }) {
    return (
        <div className="user-row">
            <div className="user-row-item">{user.user_id}</div>
            <div className="user-row-item">{user.username}</div>
            <div className="user-row-item">{user.email}</div>
            <div className="user-row-item">{user.phone_number}</div>
            <div className="user-row-item">{user.is_verified ? "Verified" : "Not Verified"}</div>
            <div className="user-row-item">Delete</div>
        </div>
    );
}
function MapUser({ users }) {
    return(
        <>
            {users.map((user) => (
                <UserRow key={user.user_id} user={user} />
            ))}
        </>
    )
}

function AllUser() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUsers = async () => {

            setLoading(true);
            const response = await UserApi.getAllUsers();
            if (response.statusCode === 200) {
                setUsers(response.data);
            } else {
                setError(response.data.error);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    return (
        <>
            <div className="allUser-container">
            <div className="title">
                    <h2>All User Handler</h2>
                </div>
                <div className="subcontainer">

                    <div className="user-list">
                        <div className="header">
                            <div className="header-item">User ID</div>
                            <div className="header-item">Username</div>
                            <div className="header-item">Email</div>
                            <div className="header-item">Phone</div>
                            <div className="header-item">Status</div>
                            <div className="header-item">Action</div>
                        </div>
                        <div className="line"></div>
                        <div className="user-items">

                            {loading ? (
                                <Loader />
                            ) : error ? (
                                <ErrorComponent error={error} />
                            ) : (
                                <MapUser users={users} />
                            )}
                            

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default AllUser;
import Loader from "../../../components/Loader/Loader";
import { UserApi } from "../../../api/user";
import { useEffect, useState } from "react";

function UserRow({ user }) {
    return (
        <div className="user-row">
            <div className="user-row-item">{user.username}</div>
            <div className="user-row-item">{user.email}</div>
            <div className="user-row-item">{user.phone}</div>
            <div className="user-row-item">{user.is_verified ? "Verified" : "Not Verified"}</div>
        </div>
    );
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

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {users.map((user) => (
                <UserRow key={user.id} user={user} />
            ))}
        </>
    );
}

export default AllUser;
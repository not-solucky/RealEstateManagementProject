import Loader from "../../../components/Loader/Loader";
import { UserApi } from "../../../api/user";
import { useEffect, useState } from "react";

function UserRow({ user }) {
    return (
        <div className="user-row">
            <div className="user-row-item">{user.username}</div>
            <div className="user-row-item">{user.email}</div>
            <div className="user-row-item">{user.phone}</div>
            <div className="user-row-item">{user.verified ? "Verified" : "Not Verified"}</div>
        </div>
    );
}

function AllUser() {
    
    return (
        <>
            all users
        </>
    );
}

export default AllUser;
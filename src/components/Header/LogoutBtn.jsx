import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import { logout as appwriteLogout } from '../../appwrite/auth';

function LogoutBtn() {
    console.log("LogoutBtn.jsx");
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            await appwriteLogout();
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button className='inline-bock px-6 py-2 duration-200 
        hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
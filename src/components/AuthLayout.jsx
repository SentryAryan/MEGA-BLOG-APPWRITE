import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function AuthLayout({ children }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authStatus) {
            navigate("/login");
        }
        setLoading(false);
    }, [authStatus, navigate]);

    if (loading) return <Loader />;

    return authStatus ? <>{children}</> : null;
}

export default AuthLayout;
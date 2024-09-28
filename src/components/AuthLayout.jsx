import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function ProtectedRoute({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (authentication !== authStatus) {
            navigate(authentication ? "/login" : "/");
        }
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    return loading ? <Loader /> : <>{children}</>;
}

export default ProtectedRoute;
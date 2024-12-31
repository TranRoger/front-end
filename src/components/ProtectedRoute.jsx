import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const { state } = useContext(AuthContext);

    if (state.user === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
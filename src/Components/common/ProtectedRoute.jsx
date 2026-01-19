import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute=()=>{ 
    const {isAuth}=useAuth();
    return isAuth ? <Outlet/> : <Navigate to="/login" />;
}

export default ProtectedRoute;
import { createContext,useState,useContext } from "react";
import { loginApi,registerApi } from "../api/auth.api";

const AuthContext=createContext();

// Safe localStorage getter
const getSafeUser = () => {
    try {
        const stored = localStorage.getItem("user");
        if (!stored || stored === "undefined") return null;
        return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
        localStorage.removeItem("user");
        return null;
    }
};

const getSafeToken = () => {
    try {
        const stored = localStorage.getItem("token");
        if (!stored || stored === "undefined") return null;
        return stored;
    } catch (e) {
        console.error("Failed to get token from localStorage:", e);
        localStorage.removeItem("token");
        return null;
    }
};

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(getSafeUser());
    const [token,setToken]=useState(getSafeToken());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const login=async(data)=>{
        setLoading(true);
        setError(null);
        try {
            const res = await loginApi(data);
            
            console.log("Login Response:", res.data); // DEBUG
            
            // Backend returns: { _id, name, email, token }
            const { token, ...userData } = res.data;
            
            if (!token || !userData._id) {
                throw new Error("Invalid login response from server");
            }
            
            setUser(userData);
            setToken(token);

            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            
            return { success: true, user: userData };
        } catch (err) {
            console.error("Login Error:", err.message); // DEBUG
            const errorMsg = err.response?.data?.message || err.message || "Login failed";
            setError(errorMsg);
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register=async(data)=>{
        setLoading(true);
        setError(null);
        try {
            const res = await registerApi(data);
            
            console.log("Register Response:", res.data); // DEBUG
            
            // Backend returns: { _id, name, email, token }
            const { token, ...userData } = res.data;
            
            if (!token || !userData._id) {
                throw new Error("Invalid registration response from server");
            }
            
            setUser(userData);
            setToken(token);
            
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            
            return { success: true, user: userData };
        } catch (err) {
            console.error("Register Error:", err.message); // DEBUG
            const errorMsg = err.response?.data?.message || err.message || "Registration failed";
            setError(errorMsg);
            setUser(null);
            setToken(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout=()=>{
        setUser(null);
        setToken(null);
        setError(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
        value={{user, token, login, register, logout, isAuth: !!token, loading, error}}
        >
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth=()=>useContext(AuthContext);
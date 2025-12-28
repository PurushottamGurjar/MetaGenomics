import { createContext,useState,useContext } from "react";
import { loginApi,registerApi } from "../api/auth.api";

const AuthContext=createContext();


export const AuthProvider=({children})=>{
    const [user,setUser]=useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token,setToken]=useState(localStorage.getItem("token"));
    const login=async(data)=>{
        const res=await loginApi(data);
        setUser(res.data.user);
        setToken(res.data.token);

        localStorage.setItem("user",JSON.stringify(res.data.user));
        localStorage.setItem("token",res.data.token);
    };

    const register=async(data)=>{
        const res=await registerApi(data);
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        localStorage.setItem("token",res.data.token);
    };

    const logout=()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");

    }

    return (
        <AuthContext.Provider
        value={{user,token,login,register,logout, isAuth:!!token}}
        >
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth=()=>useContext(AuthContext);
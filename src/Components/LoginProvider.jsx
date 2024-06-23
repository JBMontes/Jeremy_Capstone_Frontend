import { useContext, createContext, useState } from 'react';

import axios from "axios"

export const LoginData = createContext()

export function useLoginDataProvider() {
    return useContext(LoginData)
}

function LoginProvider({ children }) {

    const API = import.meta.env.VITE_BASE_URL

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [userAddress, setUserAddress] = useState(null)
    const [userLocation, setUserLocation] = useState(null)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password_hash: '',
        phone_number: '',
        username:''
    })

    const isAuthenticated = user && token

    return (
        <LoginData.Provider value={{
            API,
            user,
            setUser,
            token,
            setToken,
            isAuthenticated,
            form,
            setForm,
            userAddress,
            setUserAddress,
            userLocation,
            setUserLocation
        }}>
            {children}
        </LoginData.Provider>
    );
};

export default LoginProvider;
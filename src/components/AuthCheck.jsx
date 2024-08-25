import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const AuthCheck = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}user`, {
                    withCredentials: true,
                });
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
                alert("Bad request: please login again")
                navigate("/signin"); 
            }
        };

        checkAuth();
    }, [navigate]);

    if (!isAuthenticated) {
        return null; 
    }

    return (
        <>
            {children}
        </>
    );
};

// src/page/Login/Components/Logo/Logo.tsx

import { useNavigate } from "react-router-dom";
import './Logo.css';
import React from "react";

const Logo = () => {
    const navigate = useNavigate();
    return(
        <div>
            <img className="logo" src='../../../public/logo2.png' alt='logo' onClick={() => navigate("/")}/>
        </div>
    )
};

export default Logo;
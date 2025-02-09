// src/Components/Login/Login.ts

import { useCurrentAccount } from '@mysten/dapp-kit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from '../../assets/Logo/Logo';
import LoginBox from './Components/Login_Box/LoginBox';

const Login = () => {
    const account = useCurrentAccount();
    const userAddress = account?.address;
    const navigate = useNavigate();

    useEffect(() => {
        if (userAddress) {
            navigate("/game");
        }
    }, [userAddress, navigate]);

    return (
        <div>
            <Logo />
            {!userAddress && <LoginBox />}
        </div>
    );
};

export default Login;
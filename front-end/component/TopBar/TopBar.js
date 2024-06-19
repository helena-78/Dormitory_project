"use client";
import { useClient } from 'next/client';
import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./TopBar.css";
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function TopBar() {
    const router = useRouter();

    const handleProfileClick = () => {
        router.push('/profile');
    };

    const handleLoginClick = () => {
        router.push('/login');
    };

    const LogoImage = () => (<Image src="/LogoTopBar.png" height={70} width={70} alt="Logo" />);

    return (
        <div id="topBar">
            <div className="topBarGroup">
                <LogoImage />
                <div className="topBarButton">
                    <Button>Головна</Button>
                </div>
                <div className="topBarButton">
                    <Button>Контакти</Button>
                </div>
            </div>
            <div className="topBarGroup">
                <div className="topBarButton">
                    <Button onClick={handleProfileClick}>Профіль</Button>
                </div>
                <div id="loginImage" onClick={handleLoginClick}>
                    <LoginIcon sx={{ color: '#1976d2' }} />
                </div>
            </div>
        </div>
    );
}

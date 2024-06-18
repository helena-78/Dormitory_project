import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./TopBar.css"
import IconButton from "@mui/material/IconButton";
import LoginIcon from '@mui/icons-material/Login';

export default function () {
    const LogoImage = () => (<Image src="/LogoTopBar.png" height={70} width={70} alt=""/>);

    return (
        <div id={'topBar'}>
            <div className="topBarGroup">
                <LogoImage></LogoImage>
                <div className="topBarButton">
                    <Button>Головна</Button>
                </div>
                <div className="topBarButton">
                    <Button>Kонтакти</Button>
                </div>
            </div>
            <div className="topBarGroup">
                <div className="topBarButton">
                    <Button>Профіль</Button>
                </div>
                <div id={'loginImage'}>
                    <LoginIcon sx={{color: '#1976d2'}}></LoginIcon>
                </div>
            </div>
        </div>
    );
}
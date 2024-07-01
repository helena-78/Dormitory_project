'use client';

import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./TopBar.css"
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation'

export default function (props) {
    const LogoImage = () => (<Image src="/images/TopBar/LogoTopBar.png" height={70} width={70} alt=""/>);
    const router = useRouter()

    return (
        <div id={'topBar'}>
            <div className="topBarGroup">
                <div onClick={()=> window.open("https://www.nmu.org.ua/ua/")}>
                    <LogoImage ></LogoImage>
                </div>
                <div className="topBarButton">
                    <Button>Головна</Button>
                </div>
                <div className="topBarButton">
                    <Button>Kонтакти</Button>
                </div>
                <div className="topBarButton">
                    <Button onClick={() => router.push('/AdminPanel/Rooms')}>Админ</Button>
                </div>
            </div>
            <div className="topBarGroup">
                <div className="topBarButton" onClick={()=> props.showPopUp(!props.visibility)}>
                    <Button>Профіль
                        <div id={'loginImage'}>
                            <LoginIcon sx={{color: '#1976d2'}}></LoginIcon>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
}

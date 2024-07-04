'use client';

import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Login';
import Link from "next/link";

export default function (props) {
    const LogoImage = () => (<Image src="/images/TopBar/LogoTopBar.png" height={70} width={70} alt=""/>);

    return (
        <div id={'topBar'}>
            <div className="topBarGroup">
                <div onClick={() => window.open("https://www.nmu.org.ua/ua/")}>
                    <LogoImage></LogoImage>
                </div>
                <div className="topBarButton">
                    <Link href={{pathname: '/AdminPanel/Rooms'}} style={{all: 'unset', width: '100%', height: '100%'}}>
                        <Button>Кімнати</Button>
                    </Link>
                </div>
                <div className="topBarButton">
                    <Link href={{pathname: '/AdminPanel/Students'}} style={{all: 'unset', width: '100%', height: '100%'}}>
                        <Button>Студенти</Button>
                    </Link>
                </div>
                <div className="topBarButton">
                    <Link href={{pathname: '/AdminPanel/Applications'}} style={{all: 'unset', width: '100%', height: '100%'}}>
                        <Button>Заяви</Button>
                    </Link>
                </div>
                <div className="topBarButton">
                    <Link href={{pathname: '/AdminPanel/Payments'}} style={{all: 'unset', width: '100%', height: '100%'}}>
                        <Button>Оплати</Button>
                    </Link>
                </div>
            </div>
            <div className="topBarGroup">
                <div className="topBarButton" onClick={() => props.showPopUp(!props.visibility)}>
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

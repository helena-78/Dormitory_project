import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";

export default function () {
    const LogoImage = () => (<Image src="/Logo.png" height={70} width={70} alt=""/>);
    const ProfileImage = () => (<Image src="/ProfileImage.png" height={30} width={30} alt=""/>);

    return (
            <div id={'topBar'}>
                <div  className="topBarGroup">
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
                    <div id={'profileImage'}>
                    <ProfileImage></ProfileImage>
                    </div>
                </div>
            </div>
    );
}
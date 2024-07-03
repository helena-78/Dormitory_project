'use client';

import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import styles from "./TopBar.css"
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation'
import {useBooking} from '../../component/context/BookingContext';

export default function (props) {
    const LogoImage = () => (<Image src="/images/TopBar/LogoTopBar.png" height={70} width={70} alt=""/>);
    const router = useRouter()
    const {bookingDetails,setBookingDetails } = useBooking()
    const studentId = bookingDetails.student_id

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
              { studentId === 1 &&( 
                <div className="topBarButton">
                    <Button onClick={() => router.push('/AdminPanel/Rooms')}>Админ</Button>
                </div>
              )} 
            </div>
            <div className="topBarGroup">     
                {studentId === null && (
                    <Button onClick={() => router.push('/login')}>
                        <div id={'loginImage'}>
                            <LoginIcon sx={{color: '#1976d2'}}></LoginIcon>
                        </div>
                    </Button>
                )}
                {studentId !== null && (
                    <div className="topBarGroup">   
                    <Button onClick={() => {router.push('/profile')}}>
                        Профіль
                    </Button>
                    <Button onClick={() => {
                        setBookingDetails({
                            student_id: null
                        })
                        router.push('/')
                        }}>
                        <div id={'loginImage'}>
                            <LogoutIcon sx={{color: '#1976d2'}}></LogoutIcon>
                        </div>
                    </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

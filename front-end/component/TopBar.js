import Image from "next/image";
import * as React from "react";
import {blue, lightBlue} from "@mui/material/colors";
import Link from "@mui/material/Link";

export default function (){
    const LogoImage = () => (
        <Image
            src="/Logo.png"
            height={70}
            width={70}
            alt=""
        />
    );

    const ProfileImage = () => (
        <Image
            src="/ProfileImage.png"
            height={30}
            width={30}
            alt=""
        />
    );

    return (
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '20%'
      }}>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '20%'
          }}>
          <LogoImage style={{padding:10}}></LogoImage>
          <Link style={{padding:10}}>Головна</Link>
          <Link >Контакти</Link>
          </div>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '20%'
          }}>
          <Link style={{padding:10}}>Профіль</Link>
          <ProfileImage></ProfileImage>
          </div>
      </div>
    );
}
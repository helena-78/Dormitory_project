'use client'

import TopBar from "../../../component/AdminPanel/TopBar/TopBar";
import SignIn from "../../../component/SignIn/SignIn";
import * as React from "react";
import {useState} from "react";

export default function Layout({ children }) {
    const [popUpState, changePopUpState] = useState(false);

    return (
        <div>
            <TopBar showPopUp={changePopUpState} visibility={popUpState}/>
            <SignIn hidePopUp={changePopUpState} visibility={popUpState}/>
          {children}
        </div>
    );
}
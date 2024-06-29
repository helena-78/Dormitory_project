'use client'

import TopBar from "../../../component/AdminPanel/TopBar/TopBar";
import SignIn from "../../../component/SignIn/SignIn";
import * as React from "react";
import {useState} from "react";

export default function Layout({ children }) {
    const [popUpState, setPopUpState] = useState(false);

    return (
        <div>
            <TopBar showPopUp={setPopUpState} visibility={popUpState}/>
            <SignIn hidePopUp={setPopUpState} visibility={popUpState}/>
          {children}
        </div>
    );
}
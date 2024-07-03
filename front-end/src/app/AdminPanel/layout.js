'use client'

import TopBar from "../../../component/AdminPanel/TopBar/TopBar";
import SignIn from "../../../component/SignIn/SignIn";
import * as React from "react";
import {useState} from "react";
import AlertContext from "../../../component/AdminPanel/Alerts/AlertContext";
import AlertError from "../../../component/AdminPanel/Alerts/AlertError/AlertError";
import AlertSuccess from "../../../component/AdminPanel/Alerts/AlertSuccess/AlertSuccess";
import LoadingContext from "../../../component/Loading/LoadingContext";
import Loading from "../../../component/Loading/Loading/Loading";

export default function Layout({children}) {
    const [popUpState, setPopUpState] = useState(false);

    return (
        <div>
        <AlertContext>
            <LoadingContext>
                <TopBar showPopUp={setPopUpState} visibility={popUpState}/>
                <SignIn hidePopUp={setPopUpState} visibility={popUpState}/>
                <Loading></Loading>
                {children}
                <AlertError></AlertError>
                <AlertSuccess></AlertSuccess>
            </LoadingContext>
        </AlertContext>
        </div>
    );
}
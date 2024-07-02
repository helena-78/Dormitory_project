import {useContext} from "react";
import {AlertContext} from '../AlertContext'
import * as React from "react";
import {Alert} from "@mui/material";
import styles from "../Alert.css"

export default function AlertError(){
    const alertContext = useContext(AlertContext)

    if (alertContext.successState == true) {
        return (
            <div className={'animated'}
                 style={{position: 'fixed', zIndex: 2, top: '90vh', height: '10vh', marginRight: '3vw', left: '75%'}}>
                <Alert sx={{width: '20vw'}} severity="success">Дані успішно збережені</Alert>
            </div>
        );
    }
    else {
        return null;
    }
}
import {useContext} from "react";
import {LoadingContext} from "../LoadingContext";
import {CircularProgress} from "@mui/material";
import * as React from "react";
import styles from './Loading.css'

export default function Loading() {
    const loadingContext = useContext(LoadingContext);

    if (loadingContext.isLoading == true) {
        return (
            <div id="circularProgressContainer">
                <CircularProgress></CircularProgress>
            </div>
        );
    } else {
        return null;
    }
}
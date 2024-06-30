'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";

const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/students/';

export default function Page() {
    const [loading, setLoading] = useState('');
    const [currentData, setCurrentData] = useState([]);
    const [errorOccurredState, setErrorOccurredState] = useState(false);
    const url = `${BASE_URL}${ENDPOINT}`;

    const fetchData = async () => {
        const result = await fetch(url)
            .then(response => response.json())
            .finally(() => setLoading(false)).catch((reason) => {
                setErrorOccurredState(true);
                console.log(reason);
            });

        setCurrentData(result);
    }

    useEffect(() => {
            setLoading(true);
            fetchData()
        },
        []);

    if (errorOccurredState == true) {
        return (
            <h1 style={{paddingTop: '15vh', color: 'red', textAlign: 'center'}}>Failed to fetch data</h1>
        );
    }

    return (
        <Box className="list">
            {generateList()}
        </Box>
    );

    function generateList() {
        if (loading == true) {
            return <CircularProgress/>;
        }
        else {
            return (
                <DynamicList
                    icon={<AccountCircleIcon sx={{color: '#FFFFFF', transform: 'scale(1.9)'}}></AccountCircleIcon>}
                    itemValues={currentData.map((student) => student.name + " " + student.surname + " Id:" + student.student_id)}
                    itemIDs={currentData.map((student) => student.student_id)}
                    dataLength={currentData.length}
                    title={"студентів"}
                    itemName={"Студент "}>
                    editComponentUrl={'./EditStudent'}
                </DynamicList>
            );
        }
    }
}


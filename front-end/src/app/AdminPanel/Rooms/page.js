'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";
import {useState, useEffect} from "react";
import {CircularProgress} from "@mui/material";

export default function Page() {
    const url = 'http://127.0.0.1:8000//rooms/floor?floor=';

    const [loading, setLoading] = useState('');
    const [currentData, setCurrentData] = useState([]);

    const fetchData = async (floor) => {
        const result = await fetch(url + floor)
            .then(response => response.json()).then().finally(() => setLoading(false));

        setCurrentData(result);
    };

    return (
        <>
            <DynamicSelect handleSelectChange={handleSelectChange} title={"поверх"}
                           options={["Перший", "Другий", "Третій"]}></DynamicSelect>
            <Box className="list">
                {getRoomList()}
            </Box>
        </>
    );

    function handleSelectChange(selectedValue) {
        fetchData(parseInt(selectedValue)+1);
        setLoading(true);
    }

    function getRoomList() {
        if (loading == true) {
            return <CircularProgress />;
        } else {
            return (
                <DynamicList
                    icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                    items={currentData.map((room) => room.number)} data={currentData}
                    title={"кімнат"}
                    itemName={"Кімната "}
                    sortExpression={(listItem1, listItem2) => parseInt(listItem1.props.primary.slice(-1)) - parseInt(listItem2.props.primary.slice(-1))}
                >
                </DynamicList>
            );
        }
    }
}





'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";
import {useState, useEffect} from "react";
import {CircularProgress} from "@mui/material";

const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/rooms/floor';
const QUERY_PARAM = 'floor';

export default function Page() {
    const [loading, setLoading] = useState('');
    const [currentData, setCurrentData] = useState([]);
    const [selectState, setSelectState] = useState(1);
    const [errorOccurredState, setErrorOccurredState] = useState(false);
    const url = `${BASE_URL}${ENDPOINT}/?${QUERY_PARAM}=${selectState}`;

    const fetchData = async () => {
        const result = await fetch(url)
            .then(response => response.json())
            .finally(() => setLoading(false)).
            catch((reason)=>{
                setErrorOccurredState(true);
                console.log(reason);
            });

        setCurrentData(result);
    }

    useEffect(() => {
            setLoading(true);
            fetchData()
        },
        [selectState]);

    if(errorOccurredState==true){
        return (
          <h1 style={{paddingTop:'15vh', color:'red', textAlign:'center'}}>Failed to fetch data</h1>
        );
    }

    return (
        <>
            <DynamicSelect handleSelectChange={handleSelect} title={"поверх"}
                           options={["Перший", "Другий", "Третій"]}></DynamicSelect>
            <Box className="list">
                {getRoomList()}
            </Box>
        </>
    );

    function handleSelect(selectedOption) {
        setSelectState(parseInt(selectedOption) + 1);
    }

    function getRoomList() {
        if (loading == true) {
            return <CircularProgress/>;
        }
        else {
            return (
                <DynamicList
                    icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                    itemValues={currentData.map((room) => room.number)}
                    dataLength={currentData.length}
                    itemIDs={currentData.map((room) => room.room_id)}
                    title={"кімнат"}
                    itemName={"Кімната "}
                    editComponentUrl={'./EditRoom'}
                >
                </DynamicList>
            );
        }
    }
}





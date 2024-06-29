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
    const [selectState, setSelectState] = useState(1);
    const [errorOccurredState, setErrorOccurredState] = useState(false);

    const fetchData = async () => {
        const result = await fetch(url + selectState)
            .then(response => response.json())
            .finally(() => setLoading(false)).
            catch(()=>setErrorOccurredState(true));

        setCurrentData(result);
    }

    useEffect(() => {
            setLoading(true);
            fetchData()
        },
        [selectState]);

    if(errorOccurredState==true){
        return (
          <h1 style={{paddingTop:'15vh', color:'red'}}>Failed to fetch data</h1>
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
        } else {
            return (
                <DynamicList
                    icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                    itemValues={currentData.map((room) => room.number)}
                    dataLength={currentData.length}
                    itemIDs={currentData.map((room) => room.room_id)}
                    title={"кімнат"}
                    itemName={"Кімната "}
                    sortExpression={sortList}
                    editComponentUrl={'./EditRoom'}
                >
                </DynamicList>
            );
        }
    }

    function sortList(listItem1, listItem2) {
        return parseInt(listItem1.props.primary.slice(-1)) - parseInt(listItem2.props.primary.slice(-1));
    }
}





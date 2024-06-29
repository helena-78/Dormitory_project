'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";
import {useState} from "react";

const fakeRoomsDataFirstFloor = [
    {
        "room_id": 1,
        "number": "101",
        "available_places": "0",
        "image": "base64 encoded",
        "price": "19999",
        "gender": "M"
    },
    {
        "room_id": 2,
        "number": "102",
        "available_places": "2",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    },
    {
        "room_id": 3,
        "number": "103",
        "available_places": "3",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    }
]

const fakeRoomsDataSecondFloor = [
    {
        "room_id": 4,
        "number": "201",
        "available_places": "0",
        "image": "base64 encoded",
        "price": "19999",
        "gender": "M"
    },
    {
        "room_id": 5,
        "number": "202",
        "available_places": "2",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    },
    {
        "room_id": 6,
        "number": "203",
        "available_places": "3",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    }
]

const fakeRoomsDataThirdFloor = [
    {
        "room_id": 7,
        "number": "301",
        "available_places": "0",
        "image": "base64 encoded",
        "price": "19999",
        "gender": "M"
    },
    {
        "room_id": 8,
        "number": "302",
        "available_places": "2",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    },
    {
        "room_id": 9,
        "number": "303",
        "available_places": "3",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    }
]

export default function Page() {
    const [listState, setListState] = useState('0');

    return (
        <>
            <DynamicSelect filter={setListState} title={"поверх"}
                           options={["Перший", "Другий", "Третій"]}></DynamicSelect>
            <Box className="list" state={listState}>
                {filterRoomsByFloor(listState)}
            </Box>
        </>
    );

    function filterRoomsByFloor(selectedValue) {
        let currentData;

        switch (selectedValue) {
            case '0' :
                currentData = fakeRoomsDataFirstFloor;
                break;
            case '1':
                currentData = fakeRoomsDataSecondFloor;
                break;
            case '2':
                currentData = fakeRoomsDataThirdFloor;
                break;
        }

        return (
            <DynamicList
                icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                items={currentData.map((room) => room.number)} data={currentData}
                title={"кімнат"}
                itemName={"Кімната "}>
            </DynamicList>
        );
    }
}





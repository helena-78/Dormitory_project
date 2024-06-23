import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";

export default function Page() {
    const fakeRoomsData = [
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

    return (
        <>
            <DynamicSelect title={"поверх"} options={["Перший", "Другий", "Третій"]}></DynamicSelect>
            <Box className="list">
                <DynamicList
                    icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                    value={fakeRoomsData.map((room) => room.number)} data={fakeRoomsData} title={"кімнат"}
                    itemName={"Кімната "}></DynamicList>
            </Box>
        </>
    );
}




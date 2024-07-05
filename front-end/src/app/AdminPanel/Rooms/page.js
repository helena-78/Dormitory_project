'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import NightShelterIcon from '@mui/icons-material/NightShelter';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";
import {useState, useEffect, useContext} from "react";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";
import {AlertContext} from "../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../component/Loading/LoadingContext";

const BASE_URL = 'http://127.0.0.1:8000';
const remote_url = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/rooms/floor';
const QUERY_PARAM = 'floor';

export default function Page() {
    const [currentData, setCurrentData] = useState([]);
    const [selectState, setSelectState] = useState(1);
    const url = `${remote_url}${ENDPOINT}/?${QUERY_PARAM}=${selectState}`;
    const router = useRouter();
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);

    const fetchData = async () => {
        const result = await fetch(url)
            .then(response => response.json())
            .finally(() => changeLoadingProcessState(false)).catch((reason) => {
                showErrorAlert();
                console.log(reason);
            });

        setCurrentData(result);
    }

    useEffect(() => {
            changeLoadingProcessState(true);
            fetchData()
        },
        [selectState]);


    function getStudentByRoom(roomsOnFloor) {
        return (
            roomsOnFloor.map(
                (room) => {
                    return currentData.filter(student => student.room_id === room.room_id).map(student => student.surname).join(", ");
                }
            )
        );
    }

    return (
        <>
            <DynamicSelect handleSelectChange={handleSelect} title={"поверх"}
                           options={["Перший", "Другий", "Третій"]}></DynamicSelect>
            <Box className="list">
                {getRoomList()}
            </Box>
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '5vw'}}>
                    <Button onClick={() => {
                        router.push('/AdminPanel/Rooms/AddRoom')
                    }} variant="contained" color="primary">
                        Створити кімнату
                    </Button>
                </div>
            </div>
        </>
    );

    function handleSelect(selectedOption) {
        setSelectState(parseInt(selectedOption) + 1);
    }

    function getRoomList() {
            return (
                <DynamicList
                    icon={<NightShelterIcon sx={{color: '#FFFFFF', transform: 'scale(1.5)'}}></NightShelterIcon>}
                    items={currentData.map((room) => room)}
                    student={getStudentByRoom(currentData)}
                    dataLength={currentData.length}
                    itemIDs={currentData.map((room) => room.room_id)}
                    title={"кімнат"}
                    itemName={"Кімната "}
                    editComponentUrl={'/AdminPanel/Rooms/EditRoom'}
                >
                </DynamicList>
            );
    }

    function showErrorAlert() {
        alertContext.setErrorOccurredState();
    }

    function changeLoadingProcessState(state) {
        loadingContext.setLoadingState(state);
    }
}





import * as React from 'react';
import Box from '@mui/material/Box';
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import styles from './Application.css'
import ArticleIcon from '@mui/icons-material/Article';
import {DynamicSelect} from "../../../../component/AdminPanel/Select/DynamicSelect";

const fakeApplicationsData = [
    {
        "application_id": 1,
        "student_id": 1,
        "room_id": 1,
        "status": 'Submitted',
        "application_date": "10.06.2024",
        "desired_roommates": 2
    },
    {
        "application_id": 2,
        "student_id": 2,
        "room_id": 3,
        "status": 'Submitted',
        "application_date": "12.06.2024",
        "desired_roommates": 3
    },
    {
        "application_id": 3,
        "student_id": 3,
        "room_id": 3,
        "status": 'Submitted',
        "application_date": "11.06.2024",
        "desired_roommates": 1
    }
]

const fakeStudentsData = [
    {
        "student_id": 1,
        "name": "Вася",
        "surname": "Іванов",
    },
    {
        "student_id": 2,
        "name": "Петя",
        "surname": "Коваленко",
    },
    {
        "student_id": 3,
        "name": "Маша",
        "surname": "Шевченко",
    }
]

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

export default function Page() {
    return (
        <>
            <div id="selectContainer">
                <DynamicSelect title={"поверх"} options={["Перший", "Другий", "Третій"]}></DynamicSelect>
                <DynamicSelect title={"кімнату"} options={fakeRoomsData.map((room) => room.number)}></DynamicSelect>
            </div>
            <Box className="list">
                <DynamicList
                    icon={<ArticleIcon sx={{color: '#FFFFFF', transform: 'scale(1.4)'}}></ArticleIcon>}
                    items={getStudentById()}
                    data={fakeApplicationsData} title={"заяв"} itemName={"Заява "}></DynamicList>
            </Box>
        </>
    );
}

function getStudentById() {
    return (
        fakeApplicationsData.map(
            (application) => {
                for (let i = 0; i < fakeStudentsData.length; i++) {
                    if (fakeStudentsData[i].student_id === application.student_id) {
                        return fakeStudentsData[i].name + " " + fakeStudentsData[i].surname;
                    }
                }
            }
        )
    );
}

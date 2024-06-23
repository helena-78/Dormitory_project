import * as React from 'react';
import Box from '@mui/material/Box';
import DynamicList from "../../../../component/AdminPanel/List/DynamicList";
import commonStyles from 'src/app/AdminPanel/AdminPanel.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Page() {
    const fakeStudentsData = [
        {
            "student_id": 1,
            "name": "Вася",
            "surname": "Іванов",
            "email": "sdasdsad@gmail.com",
            "contact_number": "+38065654412",
            "gender": "Male",
            "room_id": "1",
            "application_id": "1",
            "password": "dsadasfdas"
        },
        {
            "student_id": 2,
            "name": "Петя",
            "surname": "Коваленко",
            "email": "sdasdsad@i.ua",
            "contact_number": "+380645423374",
            "gender": "Male",
            "room_id": "2",
            "application_id": "2",
            "password": "adsadasfgfg"
        },
        {
            "student_id": 3,
            "name": "Маша",
            "surname": "Шевченко",
            "email": "masha@gmail.com",
            "contact_number": "+38065654412",
            "gender": "Female",
            "room_id": "3",
            "application_id": "3",
            "password": "weqrqewrter"
        }
    ]
    return (
        <>
            <Box className="list">
                <DynamicList
                    icon={<AccountCircleIcon sx={{color: '#FFFFFF', transform: 'scale(1.9)'}}></AccountCircleIcon>}
                    value={fakeStudentsData.map((student) => student.name + " " + student.surname + " Id:" + student.student_id)}
                    data={fakeStudentsData} title={"студентів"} itemName={"Студент "}></DynamicList>
            </Box>
        </>
    );
}


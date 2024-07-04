'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import styles from './EditRoom.css';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { useParams} from 'next/navigation';
import { useState, useEffect } from 'react'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StudentList from './StudentList';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const fakeStudentsData = [
    {
        "student_id": 1,
        "name": "Вася",
        "surname": "Іванов",
        "email": "sdasdsad@gmail.com",
        "contact_number": "+38065654412",
        "gender": "Male",
        "room_id": 1,
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
        "room_id": 1,
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
        "room_id": 3,
        "application_id": "3",
        "password": "weqrqewrter"
    }
]

const fakeRoomsDataFirstFloor = [
    {
        "room_id": 1,
        "number": "101",
        "available_places": "1",
        "image": "base64 encoded",
        "price": "19999",
        "gender": "M"
    },
    {
        "room_id": 2,
        "number": "102",
        "available_places": "3",
        "image": "base64 encoded",
        "price": "2032",
        "gender": "F"
    },
    {
        "room_id": 3,
        "number": "103",
        "available_places": "2",
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



export default function EditRoom(){
    const params = useParams()
    const roomId = parseInt(params.roomId, 10); // Преобразуем roomId в число
    const [room, setRoom] = useState(null);
    const [showStudents, setShowStudents] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (roomId) {
            const foundRoom = fakeRoomsDataFirstFloor.find(room => room.room_id === roomId);
            setRoom(foundRoom);
            const studentsInRoom = fakeStudentsData.filter(student => student.room_id === roomId);
            setStudents(studentsInRoom);
        }
    }, [roomId]);

    if (!room) {
        return <div style={{marginTop:"100px"}}>Loading...</div>;
    }
    return(
        <div className='edit-block'>
            <div className='room-img-block'>
                <div className='form-title img-title'>
                    Зображення кімнати № {room.number}
                </div>
                <Image 
                    src='/images/gallery/img_5.jpg'
                    width={300}
                    height={300}
                    style={{border: '2px solid grey', borderRadius: '8px'}}
                />
                <Button
                    sx={{marginTop: '15px'}}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Змінити ображення
                <VisuallyHiddenInput type="file" />
                </Button>
            </div>
            <div>
                <Box component="form" noValidate sx={{mt: 1}} className='edit-form-rooms'>
                    <div className='form-title'>
                    Редагувати кімнату № {room.number}
                    </div>
                    <div className='form-subtitle'>
                    Номер кімнати
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="number"
                        name="number"
                        autoComplete="number"
                        autoFocus
                        defaultValue={room.number}
                    />
                    <div className='form-subtitle'>
                    Доступні місця
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="available_places"
                        id="available_places"
                        autoComplete="available_places"
                        defaultValue={room.available_places}
                    />
                    <div className='form-subtitle'>
                    Ціна
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="price"
                        id="price"
                        autoComplete="price"
                        defaultValue={room.price}
                    />
                    <div className='form-subtitle'>
                    Стать
                    </div>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="gender"
                        id="gender"
                        autoComplete="gender"
                        defaultValue={room.gender}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                    Змінити
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" style={{fontSize: '16px', cursor: 'pointer'}} onClick={() => setShowStudents(!showStudents)}>
                            {showStudents ? "Приховати інформацію про кімнату" : "Додаткова інформація про кімнату"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            {showStudents && <StudentList students={students} />}
        </div>
    )
}
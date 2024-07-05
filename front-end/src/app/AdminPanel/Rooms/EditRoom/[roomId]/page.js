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
import {useState, useEffect, useContext} from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StudentList from './StudentList';
import {AlertContext} from "../../../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../../../component/Loading/LoadingContext";

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

const BASE_URL = 'http://127.0.0.1:8000';
const remote_url = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/rooms/';

const BASE_URL_STUDENT = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT_STUDENT = '/students/';

export default function EditRoom(){   
    const [currentDataRoom, setCurrentDataRoom] = useState([]);
    // const [selectState, setSelectState] = useState(1);
    const urlRoom = `${remote_url}${ENDPOINT}`;
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);

    const [currentDataStudent, setCurrentDataStudent] = useState([]);
    // const [selectState, setSelectState] = useState(1);
    const urlStudent = `${BASE_URL_STUDENT}${ENDPOINT_STUDENT}`;

    const fetchDataRoom = async () => {
        try {
          const response = await fetch(urlRoom);
          const result = await response.json();
          setCurrentDataRoom(result);
        } catch (reason) {
          showErrorAlert();
          console.log("Error fetching rooms data:", reason);
        } finally {
          changeLoadingProcessState(false);
        }
      };

      const fetchDataStudent = async () => {
        try {
          const response = await fetch(urlStudent);
          const result = await response.json();
          setCurrentDataStudent(result);
          console.log("Students data fetched:", result); // Log fetched data
        } catch (reason) {
          showErrorAlert();
          console.log("Error fetching students data:", reason);
        } finally {
          changeLoadingProcessState(false);
        }
      };

    useEffect(() => {
            changeLoadingProcessState(true);
            fetchDataRoom()
            fetchDataStudent()
        },
        []);
    const params = useParams()
    const roomId = parseInt(params.roomId, 10); // Преобразуем roomId в число
    const [room, setRoom] = useState(null);
    const [showStudents, setShowStudents] = useState(false);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (roomId && currentDataRoom.length > 0) {
            const foundRoom = currentDataRoom.find(room => room.room_id === roomId);
            setRoom(foundRoom);
            const studentsInRoom = currentDataStudent.filter(student => student.room_id === roomId);
            setStudents(studentsInRoom);
        }
    }, [roomId, currentDataRoom]);

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
    function showErrorAlert() {
        alertContext.setErrorOccurredState();
    }

    function changeLoadingProcessState(state) {
        loadingContext.setLoadingState(state);
    }
}
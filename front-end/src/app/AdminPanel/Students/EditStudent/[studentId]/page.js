'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'next/navigation';

import {AlertContext} from "../../../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../../../component/Loading/LoadingContext";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/students/';

const EditStudent = () => {
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);

    const [currentData, setCurrentData] = useState([]);
    const url = `${BASE_URL}${ENDPOINT}`;
    const params = useParams()
    const studentId = parseInt(params.studentId, 10); // Преобразуем roomId в число
    const [student, setStudent] = useState(null);

    const fetchData = async () => {
        try {
          const response = await fetch(url);
          const result = await response.json();
          setCurrentData(result);
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
        fetchData()
    },
    []);

    useEffect(() => {
        if (studentId) {
            const foundStudent = currentData.find(student => student.student_id === studentId);
            setStudent(foundStudent);
        }
    }, [studentId, currentData]);

    if (!student) {
        return <div style={{marginTop:"100px"}}>Loading...</div>;
    }

  return (
    <div style={{marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box component="form" noValidate sx={{mt: 1}} className='edit-form'>
            <div className='form-title'>
            Редагувати інформацію про студента
            </div>
            <div className='form-subtitle'>
            Ім'я
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                id="number"
                name="number"
                autoComplete="number"
                autoFocus
                defaultValue={student.name}
            />
            <div className='form-subtitle'>
            Прізвище
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="available_places"
                id="available_places"
                autoComplete="available_places"
                defaultValue={student.surname}
            />
            <div className='form-subtitle'>
            Email
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="price"
                id="price"
                autoComplete="price"
                defaultValue={student.email}
            />
            <div className='form-subtitle'>
            Номер телефону
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                id="gender"
                autoComplete="gender"
                defaultValue={student.contact_number}
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
                defaultValue={student.gender}
            />
            <div className='form-subtitle'>
            Id кімнати
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                id="gender"
                autoComplete="gender"
                defaultValue={student.room_id}
            />
            <div className='form-subtitle'>
            Id аплікації
            </div>
            <TextField
                margin="normal"
                required
                fullWidth
                name="gender"
                id="gender"
                autoComplete="gender"
                defaultValue={student.application_id}
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
                    <Link variant="body2" style={{fontSize: '16px', cursor: 'pointer'}}>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </div>

    
    )
    function showErrorAlert() {
            alertContext.setErrorOccurredState();
    }

    function changeLoadingProcessState(state) {
        loadingContext.setLoadingState(state);
    }
}
export default EditStudent

'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image';
import styles from './EditStudent.css';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

const EditStudent = () => {
    const params = useParams()
    const studentId = parseInt(params.studentId, 10); // Преобразуем roomId в число
    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (studentId) {
            const foundStudent = fakeStudentsData.find(student => student.student_id === studentId);
            setStudent(foundStudent);
        }
    }, [studentId]);

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
}
export default EditStudent

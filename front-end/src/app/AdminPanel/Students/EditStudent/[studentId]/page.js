'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import {AlertContext} from "../../../../../../component/AdminPanel/Alerts/AlertContext";
import {LoadingContext} from "../../../../../../component/Loading/LoadingContext";
import styles from './EditStudent.css';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ENDPOINT = '/students/';

const EditStudent = () => {
    const router = useRouter();
    const alertContext = useContext(AlertContext);
    const loadingContext = useContext(LoadingContext);

    const [currentData, setCurrentData] = useState([]);
    const url = `${BASE_URL}${ENDPOINT}`;
    const params = useParams()
    const studentId = parseInt(params.studentId, 10); // Преобразуем roomId в число
    const [student, setStudent] = useState(null);

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [gender, setGender] = useState('')

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

            if (foundStudent) {
                setName(foundStudent.name);
                setSurname(foundStudent.surname);
                setEmail(foundStudent.email);
                setContactNumber(foundStudent.contact_number);
                setGender(foundStudent.gender);
            }
        }
    }, [studentId, currentData]);

    if (!student) {
        return <div style={{marginTop:"100px"}}>Loading...</div>;
    }

    const UpdateStudent = async (event) => {
        event.preventDefault();
        const updatedStudent = {
            name,
            surname,
            email,
            contact_number: contactNumber,
            gender,
        };

        try {
            const response = await fetch(`${BASE_URL}${ENDPOINT}${studentId}/`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                fetchData(); 
                router.back();
            } else {
                showErrorAlert();
            }
        } catch (reason) {
            showErrorAlert();
            console.log("Error updating student data:", reason);
        }
    };

  return (
    <div style={{marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box component="form" noValidate sx={{mt: 1}} className='edit-form' onSubmit={UpdateStudent}>
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
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
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
                defaultValue={surname}
                onChange={(e) => setSurname(e.target.value)}
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
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
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
                defaultValue={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
            />
            <div className='form-subtitle' style={{marginBottom: '15px'}}>
            Стать
            </div>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                        labelPlacement="top"
                    />
                </RadioGroup>
            </FormControl>
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

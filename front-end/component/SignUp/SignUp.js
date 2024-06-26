"use client"
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const fakeStudentsDataSet1 = [
  {
    "student_id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "gender": "M",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "password123"
  },
  {
    "student_id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "gender": "F",
    "email": "jane.smith@example.com",
    "phone": "0987654321",
    "password": "password456"
  }
];

const fakeStudentsDataSet2 = [
  {
    "student_id": 3,
    "firstName": "Alice",
    "lastName": "Johnson",
    "gender": "F",
    "email": "alice.johnson@example.com",
    "phone": "1234509876",
    "password": "password789"
  },
  {
    "student_id": 4,
    "firstName": "Bob",
    "lastName": "Brown",
    "gender": "M",
    "email": "bob.brown@example.com",
    "phone": "0987612345",
    "password": "password101"
  },
  {
    "student_id": 5,
    "firstName": "Charlie",
    "lastName": "Davis",
    "gender": "M",
    "email": "charlie.davis@example.com",
    "phone": "1122334455",
    "password": "password202"
  },
  {
    "student_id": 6,
    "firstName": "Diana",
    "lastName": "Miller",
    "gender": "F",
    "email": "diana.miller@example.com",
    "phone": "5566778899",
    "password": "password303"
  },
  {
    "student_id": 7,
    "firstName": "Eve",
    "lastName": "Wilson",
    "gender": "F",
    "email": "eve.wilson@example.com",
    "phone": "6677889900",
    "password": "password404"
  }
];


const BASE_URL = 'http://127.0.0.1:8000';
const ENDPOINT = '/students';
const QUERY_PARAM = 'student_id';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function SignUp() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      gender: data.get('gender'),
      email: data.get('email'),
      phone: data.get('phone'),
      password: data.get('password'),
    };

    console.log('User data:', user); // Виведення даних користувача в консоль
  };

  const handleClear = () => {
    document.getElementById('registration-form').reset();
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 30 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AddAPhotoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Реєстрація
        </Typography>
        <Box component="form" id="registration-form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Додати фото
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Ім'я"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Прізвище"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Стать</FormLabel>
              <RadioGroup row name="gender" defaultValue="Чоловіча">
                <FormControlLabel value="Чоловіча" control={<Radio />} label="Чоловіча" />
                <FormControlLabel value="Жіноча" control={<Radio />} label="Жіноча" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email адреса"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Номер телефону"
                name="phone"
                autoComplete="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зберегти
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleClear}
          >
            Очистити
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Маєте аккаунт? Увійти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignUp;

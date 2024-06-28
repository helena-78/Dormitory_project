"use client";
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
import CircularProgress from '@mui/material/CircularProgress';

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

function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
  
   
    const allFakeStudents = [...fakeStudentsDataSet1, ...fakeStudentsDataSet2];
    const user = allFakeStudents.find(student => student.email === email && student.password === password);
  
    if (user) {
      setLoading(false);
      localStorage.setItem('userEmail', email); 
      router.push('/profile/[student_id]');
    } else {
      try {
       
        const response = await fetch(`${BASE_URL}/students/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const result = await response.json();
  
        setLoading(false);
  
        if (response.ok && result.student_id) {
          const studentResponse = await fetch(`${BASE_URL}/students/?student_id=${result.student_id}`);
          const studentData = await studentResponse.json();
  
          if (studentResponse.ok) {
            console.log('User data:', studentData);
            localStorage.setItem('userEmail', email); 
            router.push('/profile'); 
          } else {
            setError('Error fetching user data');
          }
        } else {
          setError('Incorrect email or password');
        }
      } catch (error) {
        setLoading(false);
        setError('Connection error with server');
      }
    }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизація
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Адреса"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запам'ятати мене"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Увійти'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Забули пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Немає акаунту? Реєстрація"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
  );
}

export default SignIn;

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
import CircularProgress from '@mui/material/CircularProgress';

const BASE_URL = 'http://174.129.65.133:8000';
const ENDPOINT = '/students';

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get('firstName'),
      surname: data.get('lastName'),
      email: data.get('email'),
      contact_number: data.get('phone'),
      gender: data.get('gender'),
      password: data.get('password'),
    };

    try {
      const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const result = await response.json();
      console.log('New user registered:', result);
      setLoading(false);
      router.push('/profile');
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
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
              <RadioGroup row name="gender" >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
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
                inputProps={{
                  pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                  title: "Введіть правильну email адресу"
                }}
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
                inputProps={{
                  pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{10,}$",
                  title: "Пароль повинен містити  10 символів, включаючи хоча б одну букву"
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Зберегти'}
          </Button>
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 2 }}
            onClick={handleClear}>
            Очистити
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Маєте аккаунт? Увійти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
  );
}

export default SignUp;

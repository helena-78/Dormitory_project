"use client"
import React, { useState } from 'react';
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

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    if (!email || !password) {
      setError('Будь ласка, введіть email і пароль.');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Авторизація успішна!');
      

        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/');
      } else {
        setError(`Помилка авторизації: ${result.error}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(`Помилка: ${error.message}`);
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
            error={!!error}
            helperText={error} 
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
            error={!!error} 
            helperText={error} 
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
          >
            Увійти
          </Button>
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

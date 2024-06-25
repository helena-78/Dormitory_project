"use client";
import { useRouter } from 'next/navigation';

export function handleSubmit(event) {
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

  // Зберігання даних в LocalStorage
  localStorage.setItem('user', JSON.stringify(user));
  alert('Дані збережено локально!');

  // Перенаправлення на сторінку авторизації
  const router = useRouter();
  router.push('/login');
}

export function handleClear() {
  document.getElementById('registration-form').reset();
}

<template>
  <div>
    <NavBar />
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

async function ifLogin() {
  const token = localStorage.getItem('token');
  if (token === null) {
    router.push('/login');
  } else {
    console.log(token, "hola");
  }
}

ifLogin();
</script>

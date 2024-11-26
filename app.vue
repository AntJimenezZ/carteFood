<template>
  <div>
    <NavBar />
    <NuxtPage />
    <UNotifications />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'; // Para ejecutar código cuando el componente ya está montado
import { useRouter } from 'vue-router'; // Importar el router

const router = useRouter();

// Verifica si el usuario está logueado
function ifLogin() {
  const token = localStorage.getItem('token');
  if (token === null) {
    router.push('/login');
  } else {
    console.log(token, "hola");
  }
}

// Ejecuta la verificación solo en el cliente después de montar el componente
onMounted(() => {
  ifLogin();
});
</script>

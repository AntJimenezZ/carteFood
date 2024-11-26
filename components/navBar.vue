<template>
  <nav v-if="!esLogin" class="flex justify-between items-center p-4 text-white">
    <button 
      class="text-black font-bold py-2 px-4 rounded" 
      @click="$router.push('/')"
    >
      Inicio
    </button>
    <button 
      class="text-black font-bold py-2 px-4 rounded" 
      @click="cerrarSesion"
    >
      Cerrar Sesión
    </button>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const esLogin = computed(() => route.path === '/login')

function cerrarSesion() {
  localStorage.removeItem('token'); 
  window.location.reload();
}
</script>

<style scoped>
nav {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

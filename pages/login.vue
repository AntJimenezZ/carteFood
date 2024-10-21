<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';




const router = useRouter();
const mail = ref('');
const password = ref('');
const error = ref(false);
const errorType = ref('');

async function login() {

  try {

    const response = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mail: mail.value,
        password: password.value
      })
    });

    const data = await response.json();
    if (data.statusCode === 200) {
      console.log("Inicio de sesión exitoso");
      router.push('/');
    } else {
      console.log("Error al iniciar sesión");
      error.value = true;
      errorType.value = "Error al iniciar sesión";
    }
  }
  catch (error) {
    console.log("Error al iniciar sesión:");
  }

}


</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <UInput v-model="mail" color="blue" placeholder="Correo electronico" class="mb-4 w-full p-2 " />
      <UInput v-model="password" color="blue" type="contraseña" placeholder="Contraseña" class="mb-4 w-full p-2" />
      <div v-if="error" class="mb-4 font-semibold">
        <p class="text-red-500">{{ errorType }}</p>
      </div>
      <UButton @click="login" block color="blue" class="w-full">Iniciar
        Sesión</UButton>

      <div class="text-center mt-4">
        <ULink to="/register" class="text-blue-500">¿No tienes cuenta? Regístrate</ULink>
      </div>
    </div>
  </div>


</template>

<style></style>
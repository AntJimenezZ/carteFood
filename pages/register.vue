<script lang="ts" setup>
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from 'vue-router';





const name = ref("");
const mail = ref("");
const password = ref("");
const password2 = ref("");
const router = useRouter();


async function register() {

  try {

    const response = await fetch('api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        mail: mail.value,
        password: password.value
      })
    });

    const data = await response.json();
    if (data.statusCode === 200) {
      console.log("registro exitoso");
      router.push('/login');
    } else {
      console.log("Error al registrarse");
    }
  }
  catch (error) {
    console.log("Error al registrarse");
  }

}


</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <UInput
        v-model="name"
        color="blue"
        placeholder="Nombre"
        class="mb-4 w-full p-2"
      />
      <UInput
        v-model="mail"
        color="blue"
        placeholder="Correo electronico"
        class="mb-4 w-full p-2"
      />
      <UInput
        v-model="password"
        color="blue"
        type="password"
        placeholder="Contraseña"
        class="mb-4 w-full p-2"
      />
      <UInput
        v-model="password2"
        color="blue"
        type="password"
        placeholder="Confirmar contraseña"
        class="mb-4 w-full p-2"
      />
      <UButton @click="register" block color="blue" class="w-full"
        >Registrarse</UButton
      >

      <div class="text-center mt-4">
        <ULink to="/login" class="text-blue-500"
          >¿Ya tienes una cuenta? Inicia Sesión</ULink
        >
      </div>
    </div>
  </div>
</template>

<style></style>
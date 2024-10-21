<script lang="ts" setup>
import { createClient } from "@supabase/supabase-js";
import { ref } from 'vue';

const mail = ref('');
const password = ref('');



//No sirve porque hay que cambiar la url en supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);



async function login() {
 
  const { error } = await supabase.auth.signInWithPassword({
    email: mail.value,
    password: password.value,
  });
  if (error) {
    console.log("Error al registrar el usuario:", error.message);
  } else {
    console.log("Usuario registrado:");
  }

}


</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <UInput v-model="mail" color="blue" placeholder="Correo electronico" class="mb-4 w-full p-2 " />
      <UInput v-model="password" color="blue" type="contraseña" placeholder="Contraseña" class="mb-4 w-full p-2" />
      <UButton @click="login" block color="blue" class="w-full">Iniciar
        Sesión</UButton>

      <div class="text-center mt-4">
        <ULink to="/register" class="text-blue-500">¿No tienes cuenta? Regístrate</ULink>
      </div>
    </div>
  </div>
</template>

<style>

</style>
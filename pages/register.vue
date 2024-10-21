<script lang="ts" setup>
import { ref } from "vue";
import { createClient } from "@supabase/supabase-js";

const name = ref("");
const mail = ref("");
const password = ref("");
const password2 = ref("");



//No sirve porque hay que cambiar la url en supabase
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);


async function getCountries() {
  const { data } = await supabase.from("favorites").select();
  console.log(data);
}


async function registerUser() {
  const { error } = await supabase.auth.signUp({
    email: mail.value,
    password: password.value,
  });
  if (error) {
    console.log("Error al registrar el usuario:", error.message);
  } else {
    console.log("Usuario registrado:");
  }
};


onMounted(() => {
  getCountries();
});
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
      <UButton @click="registerUser" block color="blue" class="w-full"
        >Iniciar Sesión</UButton
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
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4">Bienvenido a CarteFood</h1>
      <p class="text-lg text-gray-700">Disfruta de la mejor comida a la carta desde la comodidad de tu hogar.</p>
    </header>

    <section class="w-full max-w-4xl">
      <h2 class="text-2xl font-semibold mb-4">Opciones</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded shadow-md">
          <h3 class="text-xl font-bold mb-2">Ir a menú cliente</h3>
          <a href="/menu" class="text-blue-500">Ver más</a>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
          <h3 class="text-xl font-bold mb-2">Ir a opciones administrador</h3>
          <a href="/createDish" class="text-blue-500">Ver más</a>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
          <h3 class="text-xl font-bold mb-2">Registro</h3>
          <a href="/register" class="text-blue-500">Ver más</a>
        </div>
      </div>
      <UButton @click="getUser" block color="blue" class="w-full mt-8">Obtener Usuario</UButton>
    </section>

    <footer class="mt-8">
      <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Ver Menú Completo</button>
    </footer>
  </div>
</template>

<script lang="ts" setup>





  async function getUser(){

    console.log(localStorage.getItem('token'));
  
  }




</script>

<style>
/* Añade estilos adicionales aquí si es necesario */
</style>
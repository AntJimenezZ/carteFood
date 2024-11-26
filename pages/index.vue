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
          <h3 class="text-xl font-bold mb-2">Ir a opciones administrador</h3>
          <UButton to="/menu" color="cyan">Seleccionar</UButton>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
          <h3 class="text-xl font-bold mb-2">Agregar Ingrediente</h3>
          <UButton to="/createDish" color="cyan">Seleccionar</UButton>
        </div>
        <div class="bg-white p-4 rounded shadow-md">
          <h3 class="text-xl font-bold mb-2">Ver Pedidos</h3>
          <UButton to="/pedidos" color="cyan">Seleccionar</UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>









</script>

<style>
/* Añade estilos adicionales aquí si es necesario */
</style>
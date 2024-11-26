<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <header class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-4">CarteFood</h1>
      
    </header>
    <section class="w-full max-w-4xl">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h3 class="text-xl font-bold mb-2">Crear/Ver Receta</h3>
          <UButton to="/menu" color="yellow">Seleccionar</UButton>
        </div>
        <div class="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h3 class="text-xl font-bold mb-2">Agregar Ingrediente</h3>
          <UButton to="/createDish" color="red">Seleccionar</UButton>
        </div>
        <div class="bg-white p-4 rounded shadow-md flex flex-col items-center">
          <h3 class="text-xl font-bold mb-2">Ver Pedidos</h3>
          <UButton to="/pedidos" color="orange">Seleccionar</UButton>
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
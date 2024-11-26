<template>
  <div class="p-4">
    <UButton @click="fetchRecetas" color="cyan" class="mb-4">Actualizar</UButton>
    <div v-if="recetas.length">
      <h2 class="text-xl font-semibold mb-4">Lista de Recetas</h2>
      <div v-for="receta in recetas" :key="receta.uniqueId" class="mb-4 p-4 bg-white rounded shadow">
        <h3 class="text-lg font-bold">{{ receta.nombre }}</h3>
        <p>{{ receta.descripcion }}</p>
        <ul class="list-disc list-inside mb-2">
          <li v-for="instruccion in receta.instrucciones" :key="instruccion">{{ instruccion }}</li>
        </ul>
        <UButton @click="eliminarReceta(receta.uniqueId)" color="red" class="mt-2">Pedido completado</UButton>
      </div>
    </div>
    <div v-else>
      <p>No hay recetas disponibles.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  id_rest: number;
  instrucciones: string[];
  uniqueId: number; // Nueva ID única
}

const recetas = ref<Receta[]>([]);
let cont = 0; // Contador para generar IDs únicas

fetchRecetas();

async function fetchRecetas() {
  try {
    const data = await $fetch('/api/orders');
    recetas.value = data.recetas.map((receta: any) => ({
      id: receta.id,
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      id_rest: receta.id_rest,
      instrucciones: receta.instrucciones,
      uniqueId: cont++, // Generar una nueva ID única usando el contador
    }));
  } catch (error) {
    console.error('Error al obtener las recetas:', error);
  }
}

function eliminarReceta(uniqueId: number) {
  recetas.value = recetas.value.filter(receta => receta.uniqueId !== uniqueId);
}
</script>

<style>

</style>
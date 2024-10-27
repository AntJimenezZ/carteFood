<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Recetas Deliciosas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Tarjeta de lista de recetas -->
      <UCard class="col-span-1 p-4">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">Lista de Recetas</h2>
          <p class="text-gray-500">Selecciona una receta para ver más detalles</p>
        </div>
        <ul class="space-y-2">
          <li v-for="receta in recetas" :key="receta.id">
            <UButton
              variant="outline"
              class="w-full justify-start"
              @click="seleccionarReceta(receta)"
            >
              <UIcon name="fluent:food-20-regular" class="mr-2 h-4 w-4" />
              {{ receta.nombre }}
            </UButton>
          </li>
        </ul>
      </UCard>

      <!-- Tarjeta de detalles de la receta -->
      <UCard class="col-span-1 p-4">
        <div class="mb-4">
          <h2 class="text-xl font-semibold">
            {{ recetaSeleccionada ? recetaSeleccionada.nombre : "Detalle de la Receta" }}
          </h2>
          <p class="text-gray-500">
            {{ recetaSeleccionada ? recetaSeleccionada.descripcion : "Selecciona una receta para ver sus detalles" }}
          </p>
        </div>
        <div v-if="recetaSeleccionada">
          <h3 class="font-semibold mb-2">Ingredientes:</h3>
          <ul class="list-disc list-inside mb-4">
            <li v-for="(ingrediente, index) in recetaSeleccionada.ingredientes" :key="index">{{ ingrediente }}</li>
          </ul>
          <h3 class="font-semibold mb-2">Instrucciones:</h3>
          <ol class="list-decimal list-inside">
            <li v-for="(instruccion, index) in recetaSeleccionada.instrucciones" :key="index">{{ instruccion }}</li>
          </ol>
        </div>
        <p v-else>No hay receta seleccionada</p>
        <div class="mt-4" v-if="recetaSeleccionada">
          <UButton variant="outline" @click="recetaSeleccionada = null">Volver a la lista</UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UCard, UButton, UIcon } from 'nuxt-ui'
import { useFetch } from '#app'

// Estado de las recetas y de la receta seleccionada
const recetas = ref([])
const recetaSeleccionada = ref(null)

// Función para seleccionar receta
function seleccionarReceta(receta) {
  recetaSeleccionada.value = receta
}

// Cargar las recetas desde la API cuando se monte el componente
onMounted(async () => {
  const { data, error } = await useFetch('/api/recetas')
  
  if (error.value) {
    console.error("Error al cargar las recetas:", error.value)
  } else {
    recetas.value = data.value.recetas
  }
})
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>

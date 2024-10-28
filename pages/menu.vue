<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Recetas Deliciosas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <h3 class="font-semibold mb-2">Ingredientes de la receta (editable):</h3>
          <ul class="list-disc list-inside mb-4">
            <li v-for="ingredienteRel in recetaSeleccionada.receta_ingrediente" :key="ingredienteRel.ingrediente_id.id">
              <label>
                <input type="checkbox" :value="ingredienteRel.ingrediente_id.id" v-model="ingredientesSeleccionados" checked />
                {{ ingredienteRel.ingrediente_id.nombre }}
              </label>
            </li>
          </ul>

          <h3 class="font-semibold mb-2">Ingredientes extra:</h3>
          <ul class="list-disc list-inside mb-4">
            <li v-for="ingrediente in ingredientes" :key="ingrediente.id">
              <label>
                <input type="checkbox" :value="ingrediente.id" v-model="ingredientesSeleccionados" />
                {{ ingrediente.nombre }}
              </label>
            </li>
          </ul>

          <h3 class="font-semibold mb-2">Instrucciones:</h3>
          <ol class="list-decimal list-inside">
            <li v-for="(instruccion, index) in recetaSeleccionada.instrucciones" :key="index">{{ instruccion }}</li>
          </ol>
        </div>
        <p v-else>No hay receta seleccionada</p>

        <div class="mt-4" v-if="recetaSeleccionada">
          <UButton variant="outline" @click="recetaSeleccionada = null">Volver a la lista</UButton>
          <UButton class="ml-2" @click="confirmarPedido">Confirmar Pedido</UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useState } from '#app'

const recetas = useState('recetas', () => [])
const recetaSeleccionada = ref(null)
const ingredientes = ref([]) 
const ingredientesSeleccionados = ref([]) 

function seleccionarReceta(receta) {
  recetaSeleccionada.value = receta
  ingredientesSeleccionados.value = receta.receta_ingrediente.map(ing => ing.ingrediente_id.id)
}

async function cargarIngredientes() {
  try {
    const data = await $fetch('/api/ingredientes')
    ingredientes.value = data.ingredientes
  } catch (error) {
    console.error("Error al cargar los ingredientes:", error)
  }
}

function confirmarPedido() {
  console.log("Receta seleccionada:", recetaSeleccionada.value)
  console.log("Ingredientes seleccionados:", ingredientesSeleccionados.value)
}

onMounted(async () => {
  try {
    const data = await $fetch('/api/recetas')
    recetas.value = data.recetas
    await cargarIngredientes() 
  } catch (error) {
    console.error("Error al cargar las recetas:", error)
  }
})
</script>
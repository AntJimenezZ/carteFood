<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold text-center mb-8">Recetas Deliciosas</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <UCard class="p-6 border rounded-lg shadow-md">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold mb-2">Lista de Recetas</h2>
          <p class="text-gray-600 mb-4">Selecciona una receta para ver más detalles o agrega una nueva receta.</p>
          <UButton class="w-full mb-4" color="cyan" @click="agregarReceta">Agregar Receta</UButton>
        </div>
        <ul class="space-y-3">
          <li v-for="receta in recetas" :key="receta.id" class="flex items-center justify-between">
            <UButton
              variant="outline"
              class="text-left justify-start flex-grow"
              color="cyan"
              @click="seleccionarReceta(receta)"
            >
              <UIcon name="fluent:food-20-regular" class="mr-2 h-5 w-5" />
              {{ receta.nombre }}
            </UButton>
            <UButton class="ml-2" color="pink" @click="eliminarReceta(receta.id)">Eliminar</UButton>
          </li>
        </ul>
      </UCard>

      <UCard class="p-6 border rounded-lg shadow-md">
        <div v-if="recetaSeleccionada">
          <div class="mb-6">
            <label class="block mb-2 font-semibold">Nombre de la Receta:</label>
            <input v-model="recetaSeleccionada.nombre" @input="actualizarReceta" class="w-full p-2 border rounded" />
          </div>
          <div class="mb-6">
            <label class="block mb-2 font-semibold">Descripción:</label>
            <textarea
              v-model="recetaSeleccionada.descripcion"
              @input="actualizarReceta"
              class="w-full p-2 border rounded"
              rows="3"
              placeholder="Descripción de la receta"
            ></textarea>
          </div>
          
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Ingredientes:</h3>
            <ul class="space-y-3">
              <li v-for="ingrediente in ingredientes" :key="ingrediente.id" class="flex items-center">
                <label class="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    :value="ingrediente.id" 
                    :checked="ingredienteSeleccionado(ingrediente.id)"
                    @change="gestionarIngrediente(ingrediente.id, $event)"
                  />
                  <span>{{ ingrediente.nombre }}</span>
                </label>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">Instrucciones:</h3>
            <ol class="space-y-3 list-decimal pl-5">
              <li v-for="(instruccion, index) in recetaSeleccionada.instrucciones" :key="index" class="flex items-center">
                <input v-model="recetaSeleccionada.instrucciones[index]" @input="actualizarReceta" class="flex-grow p-2 border rounded mr-2" />
                <UButton color="pink" @click="eliminarInstruccion(index)">Eliminar</UButton>
              </li>
            </ol>
            <UButton class="mt-4 w-full" color="cyan" @click="agregarInstruccion">Agregar Instrucción</UButton>
          </div>
          
          <div class="mt-6 flex justify-end space-x-4">
            <UButton variant="outline" color="cyan" @click="recetaSeleccionada = null">Cancelar</UButton>
            <UButton color="cyan" @click="actualizarReceta">Guardar Cambios</UButton>
          </div>
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

async function cargarRecetas() {
  try {
    const token = localStorage.getItem('token')
    const data = await $fetch('/api/recetas', {
      params: { id_rest: token }
    })
    recetas.value = data.recetas
  } catch (error) {
    console.error("Error al cargar las recetas:", error)
  }
}

async function cargarIngredientes() {
  try {
    const data = await $fetch('/api/ingredientes')
    ingredientes.value = data.ingredientes
  } catch (error) {
    console.error("Error al cargar los ingredientes:", error)
  }
}

function seleccionarReceta(receta) {
  recetaSeleccionada.value = { ...receta }
}

async function agregarReceta() {
  const nuevaReceta = {
    nombre: 'Nueva Receta',
    descripcion: 'Descripción',
    instrucciones: [],
    id_rest: localStorage.getItem('token')
  }
  try {
    await $fetch('/api/recetas', { method: 'POST', body: nuevaReceta })
    await cargarRecetas() 
  } catch (error) {
    console.error("Error al agregar la receta:", error)
  }
}

async function eliminarReceta(id) {
  await $fetch(`/api/recetas?id=${id}`, { method: 'DELETE' })
  await cargarRecetas() 
}

async function actualizarReceta() {
  await $fetch('/api/recetas', {
    method: 'PATCH',
    body: recetaSeleccionada.value
  })
}

function ingredienteSeleccionado(ingredienteId) {
  return recetaSeleccionada.value.receta_ingrediente.some(ing => ing.ingrediente_id.id === ingredienteId)
}

async function gestionarIngrediente(ingredienteId, event) {
  const recetaId = recetaSeleccionada.value.id
  if (event.target.checked) {
    await $fetch('/api/receta_ingredientes', {
      method: 'POST',
      body: { recetaId, ingredienteId }
    })
    recetaSeleccionada.value.receta_ingrediente.push({ ingrediente_id: { id: ingredienteId } })
  } else {
    await $fetch('/api/receta_ingredientes', {
      method: 'DELETE',
      body: { recetaId, ingredienteId }
    })
    recetaSeleccionada.value.receta_ingrediente = recetaSeleccionada.value.receta_ingrediente.filter(
      ing => ing.ingrediente_id.id !== ingredienteId
    )
  }
}

function agregarInstruccion() {
  recetaSeleccionada.value.instrucciones.push('Nueva Instrucción')
}

function eliminarInstruccion(index) {
  recetaSeleccionada.value.instrucciones.splice(index, 1)
  actualizarReceta()
}

onMounted(async () => {
  await cargarRecetas()
  await cargarIngredientes()
})
</script>

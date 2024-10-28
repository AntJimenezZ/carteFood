<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class="flex w-full max-w-4xl space-x-4">
            <!-- Caja de Ingredientes Disponibles -->
            <div class="bg-white p-8 rounded shadow-md w-1/2">
                <h1 class="text-2xl font-bold mb-4">Crear Plato</h1>
                <div>
                    <h2 class="text-xl font-semibold mb-2">Ingredientes Disponibles</h2>
                    <USelectMenu v-model="selectedIngredients" :options="ingredientes"
                        placeholder="Selecciona los ingredientes" multiple color="orange" />

                    <h2 class="font-semibold mt-20">Nombre del plato</h2>
                    <UInput v-model="dishName" color="orange" placeholder="Ej: Pizza" class="mb-4 w-full p-2" />
                </div>
                <UButton block @click="createDish" :disabled="dishName.length < 1 || selectedIngredients.length <1" color="orange" class="mt-4 w-full">Crear Plato</UButton>
            </div>

            <!-- Caja de Agregar Ingrediente -->
            <div class="bg-white p-8 rounded shadow-md w-1/2">
                <h2 class="text-xl font-semibold mb-2">Agregar Ingrediente</h2>
                <UInput v-model="newIngredient" color="cyan" placeholder="Ej: pimienta" class="mb-4 w-full p-2" />

                <UButton @click="addIngredient" :disabled="newIngredient.length < 1" color="cyan" class="w-full">Agregar</UButton>
            </div>
        </div>
    </div>
</template>




<script setup lang="ts">


interface Ingrediente {
    value: number;
    label: string;
}


const ingredientes = ref<any[]>([])

const selectedIngredients = ref<number[]>([]);

const newIngredient = ref('');

const dishName = ref('');

const fetchIngredients = async () => {
    try {
        const data = await $fetch('/api/ingredientes')

        ingredientes.value = data.ingredientes.map((ingrediente: any) => ({
            value: ingrediente.id,
            label: ingrediente.nombre
        }));

    } catch (error) {
        console.log("Error al obtener los ingredientes");
    }
}

const createDish = () => {
   
}
const addIngredient = () => {
    console.log(newIngredient.value);

    

}

onMounted(async () => {
    await fetchIngredients();
});



</script>

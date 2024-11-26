<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-lg bg-white p-8 rounded shadow-md">
            <h2 class="text-xl font-semibold mb-2 text-center">Agregar Ingrediente</h2>
            <UInput v-model="newIngredient" color="cyan" placeholder="Ej: pimienta" class="mb-4 w-full p-2" />
            <UButton @click="addIngredient" :disabled="newIngredient.length < 1" color="cyan" class="w-full">
                Agregar
            </UButton>
            <h2 class="text-xl font-semibold mt-6 mb-2 text-center">Lista de Ingredientes</h2>
            <USelect v-model="ingrediente" :options="ingredientes" option-attribute="nombre" />
            
        </div>

    </div>
</template>





<script setup lang="ts">


interface Ingrediente {
    value: number;
    label: string;
}


const ingredientes = ref<any[]>([])
const ingrediente = ref<any | null>(null)


const newIngredient = ref('');


const addIngredient = async () => {
    try{
        const response = await $fetch('/api/newIngredient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: newIngredient.value.charAt(0).toUpperCase() + newIngredient.value.slice(1)
            })
        });
        const data = response.statusCode;

        if (data === 200) {
            console.log("Ingrediente agregado correctamente");
            alert("Ingrediente agregado correctamente");
            newIngredient.value = '';
        }
        else {
            console.log("Error al agregar el ingrediente");
            alert("El ingrediente ya existe");
        }
        
    }
    catch(error){
        console.log("Error al agregar el ingrediente");
    }
    

    

}

cargarIngredientes();

async function cargarIngredientes() {
    try {
        const data = await $fetch('/api/ingredientes')
        ingredientes.value = data.ingredientes
        console.log(data)
    } catch (error) {
        console.error("Error al cargar los ingredientes:", error)
    }
}


onMounted(async () => {
    await cargarIngredientes();
});



</script>

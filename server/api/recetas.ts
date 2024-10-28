// /server/api/recetas.ts
import { createClient } from '@supabase/supabase-js'
import { defineEventHandler } from 'h3'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async () => {
  console.log("Gola"); // Esto debería aparecer si el endpoint está siendo llamado

  const { data, error } = await supabase
    .from('recetas')
    .select(`
      id,
      nombre,
      descripcion,
      instrucciones,
      created_at,
      receta_ingrediente (
        ingrediente_id (
          id,
          nombre
        )
      )
    `)

  if (error) {
    console.error("Error al consultar la tabla 'recetas':", error)
    throw new Error('No se pudieron obtener las recetas')
  }

  // data incluirá las recetas y los ingredientes relacionados
  return { recetas: data || [] }
})

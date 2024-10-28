// /server/api/ingredientes.ts
import { createClient } from '@supabase/supabase-js'
import { defineEventHandler } from 'h3'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async () => {
  const { data, error } = await supabase.from('ingredientes').select('*')

  if (error) {
    console.error("Error al consultar la tabla 'ingredientes':", error)
    throw new Error('No se pudieron obtener los ingredientes')
  }

  return { ingredientes: data || [] }
})

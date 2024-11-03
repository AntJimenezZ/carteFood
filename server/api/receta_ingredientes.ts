// /server/api/receta_ingredientes.ts
import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody } from 'h3'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  if (event.req.method === 'DELETE') {
    const { recetaId, ingredienteId } = await readBody(event);
    
    const { error } = await supabase
      .from('receta_ingrediente')
      .delete()
      .match({ receta_id: recetaId, ingrediente_id: ingredienteId });

    if (error) {
      console.error("Error al eliminar ingrediente de la receta:", error);
      throw new Error('No se pudo eliminar el ingrediente de la receta');
    }

    return { message: 'Ingrediente eliminado de la receta' };
  }

  if (event.req.method === 'POST') {
    const { recetaId, ingredienteId } = await readBody(event);
    
    const { error } = await supabase
      .from('receta_ingrediente')
      .insert({ receta_id: recetaId, ingrediente_id: ingredienteId });

    if (error) {
      console.error("Error al agregar ingrediente a la receta:", error);
      throw new Error('No se pudo agregar el ingrediente a la receta');
    }

    return { message: 'Ingrediente agregado a la receta' };
  }
});

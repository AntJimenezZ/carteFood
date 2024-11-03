// /server/api/recetas.ts
import { createClient } from '@supabase/supabase-js'
import { defineEventHandler, readBody, getQuery } from 'h3'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  if (event.req.method === 'GET') {
    const { id_rest } = getQuery(event);

    const { data, error } = await supabase
      .from('recetas')
      .select(`
        id,
        nombre,
        descripcion,
        instrucciones,
        id_rest,
        receta_ingrediente (
          ingrediente_id (
            id,
            nombre
          )
        )
      `)
      .eq('id_rest', id_rest);

    if (error) {
      console.error("Error al consultar la tabla 'recetas':", error);
      throw new Error('No se pudieron obtener las recetas');
    }
    return { recetas: data || [] };
  }

  if (event.req.method === 'POST') {
    const body = await readBody(event);
    const { data, error } = await supabase
      .from('recetas')
      .insert([body])
      .select();

    if (error) {
      console.error("Error al crear receta:", error);
      throw new Error('No se pudo crear la receta');
    }
    return { receta: data[0] };
  }

  if (event.req.method === 'PATCH') {
    const body = await readBody(event);
    const { id, nombre, descripcion, instrucciones } = body;
    const { error } = await supabase
      .from('recetas')
      .update({ nombre, descripcion, instrucciones })
      .eq('id', id);

    if (error) {
      console.error("Error al actualizar receta:", error);
      throw new Error('No se pudo actualizar la receta');
    }
    return { message: 'Receta actualizada' };
  }

  if (event.req.method === 'DELETE') {
    const { id } = getQuery(event);
    const { error } = await supabase
      .from('recetas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error al eliminar receta:", error);
      throw new Error('No se pudo eliminar la receta');
    }
    return { message: 'Receta eliminada' };
  }
});

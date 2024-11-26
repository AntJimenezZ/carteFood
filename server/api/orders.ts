import { createClient } from "@supabase/supabase-js";
import { defineEventHandler } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);


interface OrderRecipe {
  id: number;
  create_at: string;
  recipe_id: number;
  order_id: number;
}
interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  instrucciones: string;
}

async function getRecipes(lista: OrderRecipe[]): Promise<Receta[]> {
  const recipeIds = lista.map((item) => item.recipe_id);
  const { data, error } = await supabase
    .from("recetas")
    .select("*")
    .in("id", recipeIds);

  if (error) {
    console.error("Error al consultar la tabla 'recetas':", error);
    throw new Error("No se pudieron obtener las recetas");
  }

  const recetasMap = new Map(data.map((receta: Receta) => [receta.id, receta]));
  return recipeIds.map((id) => recetasMap.get(id) as Receta);
}

export default defineEventHandler(async (event) => {
  const { data, error } = await supabase.from("orders_recipes").select("*");

  if (error) {
    console.error("Error al consultar la tabla 'orders_recipes':", error);
    throw new Error("No se pudieron obtener las órdenes");
  }

  const recetas = await getRecipes(data);

  console.log("Data:", data);
  console.log("Recetas:", recetas);

  return {
    orders: data,
    recetas: recetas,
  };
});
import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export default defineEventHandler(async (event) => {
  try {
    // Obtener todas las recetas desde la tabla 'recetas'
    const { data, error } = await supabase
      .from("recetas")
      .select("*");

    if (error) {
      console.error("Error al obtener recetas:", error);
      return { success: false, message: "Error al obtener recetas" };
    }

    return {
      success: true,
      recetas: data,
    };
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return { success: false, message: "Error interno del servidor" };
  }
});

import { createClient } from "@supabase/supabase-js";
import { defineEventHandler } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);


export default defineEventHandler(async (event) => {
  console.log("event", event);
  const ingredient = await readBody(event);


  const { error } = await supabase
    .from("ingredientes")
    .insert({
      nombre: ingredient.nombre,
    })

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error al insertarse" }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "ingrediente agregado correctamente" }),
    };
  }
});

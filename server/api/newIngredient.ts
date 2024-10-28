
import { createClient } from "@supabase/supabase-js";
import { defineEventHandler } from "h3";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);


export default defineEventHandler(async (event) => {


  const { data, error } = await supabase.from("ingredientes").insert([
    { nombre: "Nitro"},
  ]);
  return 'Hello Nitro'


})

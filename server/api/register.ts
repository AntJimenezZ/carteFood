import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface RegisterData {
  name: string;
  mail: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const user: RegisterData = await readBody(event);

  const { error } = await supabase.auth.signUp({
    email: user.mail,
    password: user.password,
  });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error al registrarse" }),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Usuario registrado correctamente" }),
    };
  }
});

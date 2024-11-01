import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface LoginData {
  mail: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const user: LoginData = await readBody(event);

  const { error } = await supabase.auth.signInWithPassword({
    email: user.mail,
    password: user.password,
  });

  if (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Error al iniciar sesión" }),
    };
  } else {

    const token =  (await supabase.auth.getUser()).data.user?.email;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Sesión iniciada correctamente" }),
      token : token
    };
  }
});

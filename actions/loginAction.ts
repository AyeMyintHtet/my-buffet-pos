import { loginSchema } from "@/schema/loginSchema";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import {z} from 'zod'

export async function submitForm(prevState: any, formData: FormData) {
  try {
    // Parse and validate the form data using Zod
    const supabase = await createClient()
    const rawFormData = Object.fromEntries(formData.entries());
    const validatedData = loginSchema.parse(rawFormData);
    // return ;
    const obj ={
      email: validatedData.email,
      password: validatedData.password,
      options:{}
    }
    if(process.env.NODE_ENV === 'production' ) obj.options = { captchaToken:validatedData.captchaToken};
    const {data, error} = await supabase.auth.signInWithPassword(obj);
    if(data){
      return { status:'success', formData: data };
    }
    return { error: error?.message };

    
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "An unexpected error occurred." };
  }
}

"use server"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const register = async(data:{
    name:string,
    email:string,
    password:string
})=>{
    const supabase = await createClient()
    const {error} = await supabase.auth.signUp({
        email:data.email,
        password:data.password,
        options:{
            data:{
                name:data.name
            }
        }
    })

    if(error) return {error:error.message}

    redirect("/dashboard")
}


export const login = async(data:{
    email:string,
    password:string
})=>{
    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword({
        email:data.email,
        password:data.password
    })

    if(error) return {error:error.message}

    redirect('dashboard')
}


export const logout = async ()=>{
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/')
}
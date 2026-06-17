import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/types";

export const setRole = async(userId:string,role:Role)=>{
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()

    if(!user) return {error:"Not authenticated"}

    const currentRole = user.app_metadata?.role ?? user.user_metadata?.role

    if(currentRole !== "ADMIN")return {error:"Not authenticated"}
    const {error} = await supabase.auth.admin.updateUserById(userId,{
        app_metadata:{role}
    })

    if(error)return {error:error.message}
    return {success:true}
}
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase/admin"

const PromotePage = async() => {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()

    if(!user)redirect("/login")
    
    await supabaseAdmin.auth.admin.updateUserById(user.id,{
        app_metadata:{role:'ADMIN'}
    })


    redirect("/dashboard")
}
export default PromotePage
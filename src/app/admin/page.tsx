import { createClient } from "@/lib/supabase/server"


const AdminPage = async() => {
    const supabase = await createClient()
    const {data:{user}} = await supabase.auth.getUser()
  return (
    <div>
      <p>This is Admin page</p>
      <p>Your role: {user?.app_metadata?.role ?? user?.user_metadata?.role}</p>
    </div>
  )
}
export default AdminPage
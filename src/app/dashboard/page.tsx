import { createClient } from "@/lib/supabase/server"
import { logout } from "@/actions/auth"
import Link from "next/link"

const DashboardPage = async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
      <p>This is Dashboard</p>
      <p>Welcome {user?.user_metadata?.name}</p>
      <p>Email: {user?.email}</p>
      <Link href="/dashboard/expenses">Expenses</Link>
      <Link href="/dashboard/add">Add Expense</Link>
      <Link href="/dashboard/settings">Settings</Link>
      <form action={logout}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}

export default DashboardPage
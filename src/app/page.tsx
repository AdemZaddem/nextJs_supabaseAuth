import Link from "next/link"

const HomePage = () => {
  return (
    <div>
      <p>This is Home</p>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
    </div>
  )
}

export default HomePage
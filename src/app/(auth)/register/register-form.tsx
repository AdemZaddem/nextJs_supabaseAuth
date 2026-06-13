"use client"

import { useState, useTransition } from "react"
import { register } from "@/actions/auth"
import Link from "next/link"

const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    startTransition(async () => {
      const result = await register({ name, email, password })
      if (result?.error) setError(result.error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>
      <Link href="/login">Already have an account? Login</Link>
    </form>
  )
}

export default RegisterForm
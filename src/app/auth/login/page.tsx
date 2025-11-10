import Unauthorized from "@/src/features/auth/components/unauthorized"

import Link from "next/link"
import { LockKeyhole, Mail } from "lucide-react"
import { login } from "@/src/features/auth/actions/login.action"
import { Submit } from "@/src/shared"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const show = error === "true"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <form
        action={login}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-purple-500/20 shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent text-center mb-2">
            Iniciar sesión
          </h1>
          <p className="text-center text-purple-300/60 text-sm">Accede a tu panel de administrador</p>
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="mail" className="text-sm font-semibold text-purple-200 flex items-center gap-2">
            <Mail size={16} className="text-purple-400" />
            Correo Electrónico
          </label>
          <input
            className="w-full rounded-xl bg-slate-800/50 py-3 px-4 text-slate-100 text-sm font-medium placeholder-slate-500 border border-purple-500/30 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition duration-300 backdrop-blur-sm"
            placeholder="tu@correo.com"
            type="email"
            required
            id="mail"
            name="mail"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="pass" className="text-sm font-semibold text-purple-200 flex items-center gap-2">
            <LockKeyhole size={16} className="text-purple-400" />
            Contraseña
          </label>
          <input
            className="w-full rounded-xl bg-slate-800/50 py-3 px-4 text-slate-100 text-sm font-medium placeholder-slate-500 border border-purple-500/30 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition duration-300 backdrop-blur-sm"
            placeholder="••••••••"
            type="password"
            required
            id="pass"
            name="pass"
          />
        </div>

        <div className="w-full flex justify-center">
          {/* Submit button */}
          <Submit>Acceder</Submit>
        </div>

        <Link
          href="/auth/change-password"
          className="block text-center mt-6 text-sm font-medium text-purple-300 hover:text-purple-200 transition duration-300 underline underline-offset-2"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </form>

      {show && <Unauthorized />}
    </div>
  )
}

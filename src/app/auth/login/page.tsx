import { login } from "@/src/features/auth/actions/login.action";
import Unauthorized from "@/src/features/auth/components/unauthorized";
import { Submit } from "@/src/shared/components/ui/submit-client";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const show = error === "true";

  return (
    <>
      <form
        action={login}
        className="flex flex-col gap-4 max-w-[400px] mx-auto border border-gray-200 rounded-2xl p-4 bg-zinc-50 my-10"
      >
        <h1 className="text-center text-gray-800 font-semibold text-xl">
          Iniciar sesión
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="mail" className="text-sm font-semibold text-gray-700">
            Correo Electrónico:
          </label>
          <input
            className="rounded-xl bg-white py-2 px-4 text-gray-800 text-sm font-medium focus:outline-none border border-gray-300 focus:ring-2 focus:ring-gray-300 transition duration-300"
            placeholder="Jhan Doe"
            type="email"
            required
            id="mail"
            name="mail"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pass" className="text-sm font-semibold text-gray-700">
            Contraseña:
          </label>
          <input
            className="rounded-xl bg-white py-2 px-4 text-gray-800 text-sm font-medium focus:outline-none border border-gray-300 focus:ring-2 focus:ring-gray-300 transition duration-300"
            placeholder="contraseña"
            type="password"
            required
            id="pass"
            name="pass"
          />
        </div>
        <Submit>Login</Submit>
        <Link
          href="/auth/change-password"
          className="text-sm font-medium underline text-blue-500 text-center"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
      {show && <Unauthorized />}
    </>
  );
}

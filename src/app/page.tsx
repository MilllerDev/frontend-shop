import { RedirectButton } from "@/src/shared/components/ui/redirect-button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-3xl flex-col items-center justify-center p-10 bg-white dark:bg-black mx-auto">
      <div className="flex flex-col items-center gap-2 text-center my-4">
        <h1 className="text-4xl font-bold  tracking-tight text-black dark:text-zinc-50 text-center">
          Administrador de inventario
        </h1>
        <p className="text-base font-medium text-gray-700">
          Toda la administración de su tienda en un solo sitio
        </p>
      </div>
      <RedirectButton href="/auth/login">
        Acceder al Sistema <ArrowRight size={18} />
      </RedirectButton>
    </main>
  );
}

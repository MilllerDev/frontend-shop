"use client";

import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function Submit({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 cursor-pointer disabled:opacity-70"
    >
      {pending ? (
        <Loader
          size={20}
          className="animate-spin mx-auto text-gray-300"
          style={{ animationDuration: "2s" }}
        />
      ) : (
        children
      )}
    </button>
  );
}
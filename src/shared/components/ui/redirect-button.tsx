import Link from "next/link";
import { ReactNode } from "react";

export function RedirectButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-row gap-4 items-center rounded-xl px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium"
    >
      {children}
    </Link>
  );
}
"use server";

import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const data = {
    mail: formData.get("mail") as string,
    pass: formData.get("pass") as string,
  };
  console.log(data);
  if (data.pass === "1234") {
    redirect("/auth/login?error=true");
  }
  redirect("/dashboard");
}

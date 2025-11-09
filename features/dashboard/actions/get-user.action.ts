"use server";

export async function getUsers() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`).then(
    (res) => res.json()
  );
  return data;
}

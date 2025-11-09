import { getUsers } from "@/src/features/dashboard/actions/get-user.action";

export default async function DashboardPage() {
  const data = await getUsers();

  return data.length < 1 ? (
    <p>No hay datos por mostrar </p>
  ) : (
    <div className="flex flex-col gap-4">
      Datos de usuarios
      {data.map(({ id, name, phone }, index) => (
        <ol key={index}>
          <li>{id}</li>
          <li>{name}</li>
          <li>{phone}</li>
        </ol>
      ))}
    </div>
  );
}

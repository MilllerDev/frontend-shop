import { getUsers } from "@/features/dashboard/actions/get-user.action";

export default async function DashboardPage() {
  const data = await getUsers();
  return (
    <div>
      Datos de usuarios
      {data.map(({ id, name }) => (
        <span>
          {id}
          {name}
        </span>
      ))}
    </div>
  );
}

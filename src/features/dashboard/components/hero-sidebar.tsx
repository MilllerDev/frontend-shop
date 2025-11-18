import { Package } from "lucide-react";
import { getUser } from "../actions/get-user.action";


export default async function HeroSidebar() {

  const user = await getUser();

  return (
    <div className="p-6 border-b border-primary/20 flex flex-col justify-center items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/50">
        <Package className="text-accent-foreground" size={24} />
      </div>
      <div className="hidden md:block text-center">
        <h1 className="text-lg font-bold text-foreground">{user.fullname}</h1>
        <p className="text-xs text-primary/70">{user.email}</p>
      </div>
    </div>
  );
}

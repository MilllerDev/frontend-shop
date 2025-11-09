export default function Unauthorized() {
  return (
    <div className="border border-red-500 p-4 rounded-xl bg-red-100 w-fit mx-auto">
      <p className="text-sm font-medium text-red-500">
        Las credeneciales ingresadas son incorrectas intentelo nuevamente
      </p>
    </div>
  );
}

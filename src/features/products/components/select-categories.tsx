import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/components/ui/select";
import { getCategories } from "../actions/create.product";
import { Label } from "@/src/shared/components/ui/label";

type SelectyProps = {
  defaultId?: string;
};

export default async function SelectCategories({ defaultId }: SelectyProps) {
  const categories = await getCategories();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="category">Categoria</Label>
      <Select name="category" defaultValue={defaultId}>
        <SelectTrigger className="col-span-1">
          <SelectValue placeholder="Seleciona una categoria" />
        </SelectTrigger>
        <SelectContent position="popper" className="bg-white">
          <SelectGroup>
            <SelectLabel>Categorias</SelectLabel>
            {categories.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

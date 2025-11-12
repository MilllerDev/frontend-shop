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

export default async function SelectCategories() {
  const categories = await getCategories();

  return (
    <Select name="category">
      <SelectTrigger className="w-[250px]">
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
  );
}

"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/shared";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface ComboOption {
  value: string;
  label: string;
}

interface ComboProps {
  id: string;
  options: ComboOption[];
  placeholder: string;
  onSelect?: (select: string) => void;
}

export function ComboBox({ id, options, placeholder, onSelect }: ComboProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      {id && <input type="hidden" name={id} value={value} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="bg-background w-full">
            <CommandInput placeholder="Busca ..." className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontró ningún resultado.</CommandEmpty>
              <CommandGroup className="bg-background">
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => {
                      setValue(option.value);
                      onSelect?.(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}

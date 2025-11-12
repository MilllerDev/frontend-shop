"use client";

import { useRef, useState } from "react";
import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared";

export default function ImageUploadPreview() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // limpiar input
    }
  };

  return (
    <div className="grid w-full max-w-sm items-start gap-3">
      <Label htmlFor="image">Imágen</Label>
      <Input
        id="image"
        name="image"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        ref={fileInputRef}
        onChange={handleImageChange}
        className={preview ? "hidden" : ""}
      />

      {preview && (
        <div className="flex items-center justify-center gap-4">
          <div className="relative w-35 h-25 overflow-hidden rounded-xl border border-border shadow-sm">
            <img
              src={preview}
              alt="Vista previa"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            className="shrink-0"
          >
            Quitar
          </Button>
        </div>
      )}
    </div>
  );
}

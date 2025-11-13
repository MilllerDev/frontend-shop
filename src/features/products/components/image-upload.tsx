"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Label } from "@/src/shared/components/ui/label";
import { Input } from "@/src/shared/components/ui/input";
import { Button } from "@/src/shared";
import { Upload } from "lucide-react";
import { Card, CardTitle } from "@/src/shared/components/ui/card";

export function UploadImage() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="grid w-full items-start gap-3">
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
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full h-14 overflow-hidden rounded-xl border border-border shadow-sm">
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

export function ChangeImage({ defaultImg }: { defaultImg: string }) {
  const [preview, setPreview] = useState(defaultImg);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <Card className="p-6 sticky top-8 border rounded-lg">
      <CardTitle>Imagen del Producto</CardTitle>
      <div>
        <div className="w-full h-60 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Vista previa del producto"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Sin imagen</span>
          )}
        </div>
      </div>

      <label
        htmlFor="image"
        className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
      >
        <Upload className="w-5 h-5" />
        Cambiar Imagen
      </label>

      <input
        id="image"
        name="image"
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleImageChange}
      />
    </Card>
  );
}

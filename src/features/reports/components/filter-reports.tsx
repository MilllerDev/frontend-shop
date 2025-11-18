"use client";

import { Button } from '@/src/shared';
import { Input } from '@/src/shared/components/ui/input';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateReport } from '../actions/generate-report';

type Inputs = {
  start: string;
  end: string;
};

export const FilterReports = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      const resp = await generateReport(data);

      const binary = atob(resp.file);
      const len = binary.length;
      const buffer = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        buffer[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([buffer], { type: resp.contentType });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = resp.fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar reporte:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Desde</label>
        <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Input
            type="date"
            {...register("start")}
            className="border-0 p-0 h-auto focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Hasta</label>
        <div className="flex items-center gap-2 border border-border rounded-md px-3 py-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <Input
            type="date"
            {...register("end")}
            className="border-0 p-0 h-auto focus-visible:ring-0"
          />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <Button className="w-full" disabled={loading}>
          {loading ? "Generando..." : "Generar reporte"}
        </Button>
      </div>
    </form>
  );
};

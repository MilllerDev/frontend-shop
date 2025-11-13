"use client"

import { Button } from "@/src/shared";
import { DialogClose, DialogFooter } from "@/src/shared/components/ui/dialog";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form"
import { createClient } from "../actions/create-client.action";
import Swal from 'sweetalert2'

interface Props {
  onSuccess: () => void
}

type Inputs = {
  name: string;
  lastname: string;
  phone: string;
  direccion?: string
}

export const CreateClientForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<Inputs>()

  const showSuccessToast = () => {
    Swal.fire({
      title: '¡Cliente creado!',
      text: 'El cliente se ha registrado exitosamente',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#f0fdf4',
      iconColor: '#22c55e'
    })
  }

  const showErrorToast = (message: string = 'Error al crear el cliente') => {
    Swal.fire({
      title: '¡Error!',
      text: message,
      icon: 'error',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      background: '#fef2f2',
      iconColor: '#ef4444'
    })
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const resp = await createClient(data);

      if (!resp?.id) {
        showErrorToast();
        return;
      }

      showSuccessToast();
      onSuccess();
      reset();

    } catch (error) {
      console.error('Error creating client:', error);
      showErrorToast('Ha ocurrido un error inesperado');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Nombre:</Label>
            <Input
              id="name"
              placeholder="Jhon"
              {...register("name", { required: true })}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="title">Apellidos:</Label>
            <Input
              id="lastname"
              placeholder="Doe"
              {...register("lastname", { required: true })}
            />
          </div>
          <div className="grid gap-3 items-end">
            <div className="flex flex-col gap-3">
              <Label htmlFor="phone">Teléfono:</Label>
              <Input
                id="phone"
                placeholder="987654321"
                {...register("phone", { required: true })}
              />
            </div>
          </div>
          <div className="grid gap-3 items-end">
            <div className="flex flex-col gap-3">
              <Label htmlFor="direction">Dirección:</Label>
              <Input
                id="direction"
                placeholder="San Martín - Lima"
                {...register("direccion")}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </form>
    </>
  )
}
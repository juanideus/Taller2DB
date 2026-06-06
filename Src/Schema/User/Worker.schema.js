import { validateRut } from "../../Util/ValidateRut.js";
import z from "zod";
/**
bono int 
contrasenia varchar(60) 
correo varchar(80) 
nombre varchar(120) 
rut varchar(13) 
sueldo int 
Rolid int
 */

export const workerSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre no puede estar vacío"),
  rut: z
    .string({
      required_error: "El RUT es requerido",
      invalid_type_error: "El RUT debe ser un texto",
    })
    .min(1, "El RUT no puede estar vacío"),

  correo: z
    .string({
      required_error: "El correo es requerido",
      invalid_type_error: "El correo debe ser un texto",
    })
    .email("El correo no es válido"),
  contrasenia: z
    .string({
      required_error: "La contraseña es requerida",
      invalid_type_error: "La contraseña debe ser un texto",
    })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  sueldo: z
    .number({
      required_error: "El sueldo es requerido",
      invalid_type_error: "El sueldo debe ser un número",
    })
    .positive("El sueldo debe ser un número positivo"),
  bono: z
    .number({
      required_error: "El bono es requerido",
      invalid_type_error: "El bono debe ser un número",
    })
    .nonnegative("El bono no puede ser negativo"),
  Rolid: z.coerce
    .number({
      required_error: "El rolId es requerido",
      invalid_type_error: "El rolId debe ser un número",
    })
    .positive("El rolId debe ser un número positivo"),
});
export const validateWorker = (data) => {
  try {
    workerSchema.parse(data);
  } catch (error) {
    new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateWorkerParse = (data) => {
  return workerSchema.safeParse(data);
};

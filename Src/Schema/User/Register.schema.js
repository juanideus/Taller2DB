import z from "zod";
import { validateRut } from "../../Util/validateRut.js";
export const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto",
  }),
  rut: z.string({
    required_error: "El RUT es requerido",
    invalid_type_error: "El RUT debe ser un texto",
  }).refine(async (rut) => await validateRut(rut), {
    message: "El RUT no es válido",
  }),
  direccion: z.string({
    required_error: "La dirección es requerida",
    invalid_type_error: "La dirección debe ser un texto",
  }),
  estado: z
    .number({
      required_error: "El estado es requerido",
      invalid_type_error: "El estado debe ser un número",
    })
    .int("El estado debe ser un número entero")
    .refine((val) => val === 0 || val === 1, {
      message: "El estado debe ser 0 (deshabilitado) o 1 (habilitado)",
    }),
});
export const validateRegisterParse = async (data) => {
  return await registerSchema.safeParseAsync(data);
};
export const validateRegister = (data) => {
  try {
    registerSchema.parse(data);
  } catch (error) {
    new Error(error.errors.map((e) => e.message).join(", "));
  }
};
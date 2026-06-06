import { z } from "zod";
export const UserSchema = z.object({
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

  direccion: z
    .string({
      required_error: "La dirección es requerida",
      invalid_type_error: "La dirección debe ser un texto",
    })
    .min(1, "La dirección no puede estar vacía"),
});

export const validateUser = (data) => {
  try {
    UserSchema.parse(data);
  } catch (error) {
    new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateUserParse = (data) => {
  return UserSchema.safeParse(data);
};

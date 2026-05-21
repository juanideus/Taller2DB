import { z } from "zod";
export const copyBookSchema = z.object({
  id: z.coerce
    .number({
      required_error: "El ID del libro es requerido",
      invalid_type_error: "El ID del libro debe ser un número",
    })
    .int("El ID del libro debe ser un número entero")
    .positive("El ID del libro debe ser un número positivo"),
  codBarra: z
    .string({
      required_error: "El código de barra es requerido",
      invalid_type_error: "El código de barra debe ser un texto",
    })
    .min(1, "El código de barra no puede estar vacío"),
});
export const validateCopyBook = (data) => {
  try {
    copyBookSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateCopyBookParse = (data) => {
  return copyBookSchema.safeParse(data);
};
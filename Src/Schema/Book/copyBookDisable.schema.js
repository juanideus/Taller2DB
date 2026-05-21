import { z } from "zod";

export const copyBookDisableSchema = z.object({
  id: z.coerce
    .number({
      required_error: "El ID de la copia es requerido",
      invalid_type_error: "El ID de la copia debe ser un número",
    })
    .int("El ID de la copia debe ser un número entero")
    .positive("El ID de la copia debe ser un número positivo"),
});

export const validateCopyBookDisable = (data) => {
  try {
    copyBookDisableSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateCopyBookDisableParse = (data) => {
  return copyBookDisableSchema.safeParse(data);
};
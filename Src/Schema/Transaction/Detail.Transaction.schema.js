import { z } from "zod";

const DetailTransactionSchema = z.object({
  id: z.number({
    required_error: "El ID del usuario es requerido",
    invalid_type_error: "El ID del usuario debe ser un número",
  }),
  date: z.string({
    required_error: "La fecha es requerida",
    invalid_type_error: "La fecha debe ser una cadena de texto",
  }),
});

export const validateDetailTransaction = (data) => {
  try {
    DetailTransactionSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateDetailTransactionParse = (data) => {
  return DetailTransactionSchema.safeParse(data);
};

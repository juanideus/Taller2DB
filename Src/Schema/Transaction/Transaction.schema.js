import { z } from "zod";

const TransactionSchema = z.object({
  Trabajadorid: z.number({
    required_error: "El ID del trabajador es requerido",
    invalid_type_error: "El ID del trabajador debe ser un número",
  }),
  Usuarioid: z.number({
    required_error: "El ID del usuario es requerido",
    invalid_type_error: "El ID del usuario debe ser un número",
  }),
  Copia_libroid: z.array(
    z.number({
      required_error: "El ID de la copia del libro es requerido",
      invalid_type_error: "El ID de la copia del libro debe ser un número",
    })
  ).min(1, "Debe incluir al menos una copia de libro"),
  es_venta: z.boolean({
    required_error: "El campo es_venta es requerido",
    invalid_type_error: "El campo es_venta debe ser un booleano",
  }),
  es_prestamo: z.boolean({
    required_error: "El campo es_prestamo es requerido",
    invalid_type_error: "El campo es_prestamo debe ser un booleano",
  }),
});

export const validateTransactionParse = (data) => {
  return TransactionSchema.safeParse(data);
};
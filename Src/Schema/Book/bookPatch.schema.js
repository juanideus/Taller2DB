import { z } from "zod";
export const bookPatchPriceSchema = z.object({
  id: z.coerce
    .number({
      required_error: "El ID del libro es requerido",
      invalid_type_error: "El ID del libro debe ser un número",
    })
    .int("El ID del libro debe ser un número entero")
    .positive("El ID del libro debe ser un número positivo"),
  precio: z
    .number({
      required_error: "El precio es requerido",
      invalid_type_error: "El precio debe ser un número",
    })
    .positive("El precio debe ser un número mayor a cero"),
});


export const validateBookPatchPrice = (data) => {
  try {
    bookPatchPriceSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
  
};
export const validateBookPatchPriceParse = (data) => {
    return bookPatchPriceSchema.safeParse(data);
  };

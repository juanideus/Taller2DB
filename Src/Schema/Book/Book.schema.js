import { z } from "zod";

export const BookSchema = z.object({
  Nombre: z
    .string({
      required_error: "El nombre del libro es requerido",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre del libro no puede estar vacío"),

  Genero: z.string({
    required_error: "El género es requerido",
    invalid_type_error: "El género debe ser un texto",
  }).min(6,"El largo del genero es muy corto"),

  Autor: z
    .string({
      required_error: "El autor es requerido",
      invalid_type_error: "El autor debe ser un texto",
    })
    .min(1, "El autor del libro no puede estar vacío"),

  fecha_recepcion: z
    .string({
      required_error: "La fecha de recepción es requerida",
      invalid_type_error:
        "La fecha no puede ser numérica, debe ser un texto (YYYY-MM-DD)",
    })
    .min(1, "La fecha de recepción es requerida"),

  cantidad_copias: z
    .number({
      required_error: "La cantidad de copias es requerida",
      invalid_type_error: "La cantidad de copias debe ser un número",
    })
    .int("La cantidad de copias debe ser un número entero")
    .positive("La cantidad de copias debe ser un número positivo"),

  edad_sugerida: z
    .number({
      required_error: "La edad sugerida es requerida",
      invalid_type_error: "La edad sugerida debe ser un número",
    })
    .int("La edad sugerida debe ser un número entero")
    .positive("La edad sugerida debe ser un número positivo")
    .nullable(), // Permitimos null porque en tu BD esta columna acepta Nulos

  editorial: z
    .string({
      required_error: "La editorial es requerida",
      invalid_type_error: "La editorial debe ser un texto",
    })
    .min(1, "La editorial del libro no puede estar vacía")
    .nullable(), // Permitimos null porque en tu BD esta columna acepta Nulos

  precio: z
    .number({
      required_error: "El precio es requerido",
      invalid_type_error: "El precio debe ser un número",
    })
    .positive("El precio debe ser un número mayor a cero"),

  estado: z
    .number({
      required_error: "El estado es requerido",
      invalid_type_error: "El estado debe ser un número (0 o 1)",
    })
    .int("El estado debe ser un número entero")
    .min(0, "El estado mínimo es 0")
    .max(1, "El estado máximo es 1"),
});

export const validateBook = (data) => {
  try {
    BookSchema.parse(data);
  } catch (error) {
    throw new Error(error.errors.map((e) => e.message).join(", "));
  }
};
export const validateBookParse = (data) => {
  return BookSchema.safeParse(data);
};



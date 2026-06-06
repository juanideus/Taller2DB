import z from "zod";
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El email es requerido",
      invalid_type_error: "El email debe ser un texto",
    })
    .email("El email no es válido"),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});

export const validateLoginParse = (data) => {
  return loginSchema.safeParse(data);
};
export const validateLogin = (data) => {
  try {
    loginSchema.parse(data);
  } catch (error) {
    new Error(error.errors.map((e) => e.message).join(", "));
  }
};

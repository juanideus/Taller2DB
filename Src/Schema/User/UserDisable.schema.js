import {z} from "zod";

export const UserDisableSchema = z.object({
  id: z.string().nonempty("El ID del usuario es requerido"),
}
);
export const validateUserDisable = (data) => {
    try {
        UserDisableSchema.parse(data);
    } catch (error) {
        new Error(error.errors.map((e) => e.message).join(", "));
    }
};
export const validateUserDisableParse = (data) => {
    return UserDisableSchema.safeParse(data);
}
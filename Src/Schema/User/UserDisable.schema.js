import {z} from "zod";

export const UserDisableSchema = z.object({
    rut: z.string({
        required_error: "El RUT es requerido",
        invalid_type_error: "El RUT debe ser un texto",
    }).min(8, "El RUT no puede estar vacío"),
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
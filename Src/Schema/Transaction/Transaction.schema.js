

import {z} from "zod";
/*
id int AI PK 
Trabajadorid int 
Usuarioid int 
Fecha date 
semestre int 
precio_total int 
Copia_libroid int 
es_venta tinyint(1) 
es_prestamo tinyint(1

*/
const TransactionSchema = z.object({
    idTrabajador: z.number({
        required_error: "El ID del trabajador es requerido",
        invalid_type_error: "El ID del trabajador debe ser un número",
    }),
    idUsuario: z.number({
        required_error: "El ID del usuario es requerido",
        invalid_type_error: "El ID del usuario debe ser un número",
    }),
    Fecha: z.string(
        {
            required_error: "La fecha es requerida",
            invalid_type_error: "La fecha debe ser una cadena de texto",
        }
    ),
    semestre: z.number({
        required_error: "El semestre es requerido",
        invalid_type_error: "El semestre debe ser un número",
    }),
    precio_total: z.number(
        {
            required_error: "El precio total es requerido",
            invalid_type_error: "El precio total debe ser un número",
        }
    ),
    Copia_libroid: z.number(
        {
            required_error: "El ID de la copia del libro es requerido",
            invalid_type_error: "El ID de la copia del libro debe ser un número",
        }
    ),
    esVenta: z.number({
        required_error: "El campo es Venta es requerido",
        invalid_type_error: "El campo es Venta debe ser un número",
    }).min(0).max(1),
    esPrestamo: z.number({
        required_error: "El campo es Prestamo es requerido",
        invalid_type_error: "El campo es Prestamo debe ser un número",
    }).min(0).max(1),
});
export const validateTransaction = (data) => {
    try {
        TransactionSchema.parse(data);
    } catch (error) {
        throw new Error(error.errors.map((e) => e.message).join(", "));
    }
};
export const validateTransactionParse = (data) => {
    return TransactionSchema.safeParse(data);
}

import { de } from "zod/v4/locales";
import { executeQuery } from "../Db/Db.js";
import { HandleError } from "../Util/Error.js";
export  async function addUser(data) {
  const { rut, nombre, edad, direccion } = data;

  try {
    //Validamos si el usuario ya existe por rut
    const querySelect = `SELECT * FROM usuario WHERE rut = ?`;
    const resultSelect = await executeQuery(querySelect, [rut]);
    console.log("resultSelect: ", resultSelect.length);
    if (resultSelect.length > 0) {
      throw new HandleError("El usuario ya existe en el sistema", 409);
    }

    const query = `INSERT INTO usuario (rut,nombre,edad,estado,direccion) VALUES (?, ?, ?, ?, ?)`;
    return await executeQuery(query, [rut, nombre, edad, 1, direccion]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al agregar el usuario: " + error.message, 500);
  }
}
export  async function disableUser(data) {
  const { rut } = data;
  try {
    const query = `SELECT * FROM usuario WHERE rut = ?`;
    const result = await executeQuery(query, [rut]);
    if (result.length === 0) {
      throw new HandleError("Usuario no encontrado", 404);
    }
    const queryUpdate = `UPDATE usuario SET estado = 0 WHERE rut = ?`;
    return await executeQuery(queryUpdate, [rut]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al deshabilitar el usuario: " + error.message, 500);
  }
}
    

import { executeQuery } from "../Db/Db.js";

export default async function addUser(data) {
  const { nombre, edad, rut, direccion } = data;
  console.log({ nombre, edad, rut, direccion });
  if (!nombre || !edad || !rut || !direccion) {
    throw new Error("Faltan campos obligatorios");
  }
  try {
    const query = `INSERT INTO usuario (rut,nombre,edad,estado,direccion) VALUES (?, ?, ?, ?, ?)`;
    return await executeQuery(query, [rut, nombre, edad, 1, direccion]);
  } catch (error) {
    throw new Error("Error al agregar el usuario: ");
  }
}

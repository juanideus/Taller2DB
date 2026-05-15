import { executeQuery } from "../Db/Db.js";

export async function addLibro(data) {
  const { nombre, autor, fechaRecepcion, edadSugerida, editorial, precio } =
    data;

  if (
    !nombre ||
    !autor ||
    !fechaRecepcion ||
    !edadSugerida ||
    !editorial ||
    !precio
  ) {
    throw new Error("Faltan campos obligatorios");
  }
  const query = `
    INSERT INTO libro 
    (nombre, autor, fechaRecepcion, edadSug, editorial, precio)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  return await executeQuery(query, [
    nombre,
    autor,
    fechaRecepcion,
    edadSugerida,
    editorial,
    precio,
  ]);
}
export async function patchPriceBook(data) {
  const { id, precio } = data;
  console.log({ id, precio });
  if (!id || !precio) {
    throw new Error("Error al actualizar el precio del libro: ");
  }
  //1. buscar el libro en la base de datos
  try {
    //1. buscar el libro en la base de datos

    const querySelect = `SELECT * FROM libro WHERE id = ?`;
    const resultSelect = await executeQuery(querySelect, [id]);
    //si recibimos un libro entonces actualizamos el precio
    if (resultSelect.length > 0) {
      const queryUpdate = `UPDATE libro SET precio = ? WHERE id = ?`;
      return await executeQuery(queryUpdate, [precio, id]);
    }
  } catch (error) {
    throw new Error("Error al actualizar el precio del libro: ");
  }
}
export async function postGenerateCopy(id, codBarra) {
  if (!id || !codBarra) {
    throw new Error("Faltan campos obligatorios");
  }
  try {
    const querySelect = `SELECT * FROM libro WHERE id = ?`;
    const resultSelect = await executeQuery(querySelect, [id]);
    if (resultSelect.length > 0) {
      const queryInsert = `INSERT INTO copia (codBarra, idLibro) VALUES (?, ?)`;
      const queryIncrement = `UPDATE libro SET cantCopias = cantCopias + 1 WHERE id = ?`;
      await executeQuery(queryIncrement, [id]);
      return await executeQuery(queryInsert, [codBarra, id]);
    }
    throw new Error("No se encontró el libro con el id proporcionado");
  } catch (error) {
    throw new Error("Error al generar la copia del libro " + error.message);
  }
}

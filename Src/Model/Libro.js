import { executeQuery } from "../Db/Db.js";

export default async function addLibro (data) {
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

import { HandleError } from "../../Util/Error.js";
import {randomUUID} from "crypto";
import { executeQuery } from "../../Db/Db.js";
export async function generateTransaction(data) {
  const {
    idTrabajador,
    idUsuario,
    Fecha,
    semestre,
    precio_total,
    Copia_libroid,
    esVenta,
    esPrestamo,
  } = data;
  const idTransaccion = randomUUID();
  console.log (idTransaccion);
  console.log("generateTransaction data: ", data.idTrabajador);
  try {
    // 1. Validamos si el trabajador existe
    if (!(await existWorker(idTrabajador))) {
      throw new HandleError("El trabajador no existe", 404);
    }

    // 2. Validamos si el usuario existe
    if (!(await existUser(idUsuario))) {
      throw new HandleError("El usuario no existe", 404);
    }

    // 3. Validamos que el libro exista y esté disponible
    if (!(await existBook(Copia_libroid))) {
      throw new HandleError("El libro no existe o no está disponible", 404);
    }

    // 4. Validamos que sea préstamo o venta
    if (esPrestamo && esVenta) {
      throw new HandleError(
        "La transacción no puede ser préstamo y venta al mismo tiempo",
        400,
      );
    }

    if (!esPrestamo && !esVenta) {
      throw new HandleError("La transacción debe ser préstamo o venta", 400);
    }

    // 5. Insertamos transacción
    const queryInsert = `
      INSERT INTO transaccion
      (
        Trabajadorid,
        Usuarioid,
        Fecha,
        semestre,
        precio_total,
        Copia_libroid,
        es_venta,
        es_prestamo,
        id_Transaccion
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return await executeQuery(queryInsert, [
      idTrabajador,
      idUsuario,
      Fecha,
      semestre,
      precio_total,
      Copia_libroid,
      esVenta,
      esPrestamo,
      idTransaccion,
    ]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }

    throw new HandleError(
      "Error al generar la transacción: " + error.message,
      500,
    );
  }
}
async function existWorker(idTrabajador) {
  const query = `SELECT * FROM trabajador WHERE id = ?`;
  const result = await executeQuery(query, [idTrabajador]);
  console.log("existWorker result: ", result);
  return result.length > 0;
}
async function existUser(idUsuario) {
  const query = `SELECT * FROM usuario WHERE id = ?`;
  const result = await executeQuery(query, [idUsuario]);
  return result.length > 0;
}
async function existBook(copiaLibroId) {
  const query = `SELECT * FROM copia_libro WHERE id = ? AND estado = 1`;
  const result = await executeQuery(query, [copiaLibroId]);
  return result.length > 0;
}
export async function getDetailsTransaction(data) {
  const { id, date } = data;
  
  try {
    //Validamos si el usuario existe
    const querySelectUser = `SELECT * FROM usuario WHERE id = ?`;
    const resultSelectUser = await executeQuery(querySelectUser, [id]);
    if (resultSelectUser.length === 0) {
      throw new HandleError(`El usuario con el id ${id}, No EXISTE`, 404);
    }
    //validamos si la transaccion existe para el usuario y la fecha solicitada
    const querySelectTransaction = `SELECT * FROM transaccion WHERE Usuarioid = ? AND Fecha = ?`;
    const resultSelectTransaction = await executeQuery(querySelectTransaction, [
      id,
      date,
    ]);
    if (resultSelectTransaction.length === 0) {
      throw new HandleError(`El usuario No posee transacciones`,404)
    }
    //si existen transacciones, obtenemos los detalles de cada una
    return resultSelectTransaction;
    
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error interno del servidor", 500);
  }
}

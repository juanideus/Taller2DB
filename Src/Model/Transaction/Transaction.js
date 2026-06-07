import { HandleError } from "../../Util/Error.js";
import { randomUUID } from "crypto";
import { executeQuery, pool } from "../../Db/Db.js";
export async function generateTransaction(data) {
  const { Trabajadorid, Usuarioid, Copia_libroid, es_venta, es_prestamo } =
    data;

  const date = new Date();
  const semestre = Math.ceil((date.getMonth() + 1) / 6);
  const issell = es_venta ? 1 : 0;
  const isloan = es_prestamo ? 1 : 0;
  // ← elimina el precio_total de aquí
  let idTransaccion = null; // ← inicializa idTransaccion aquí
  const ids = [];

  try {
    if (!(await existWorker(Trabajadorid))) {
      throw new HandleError("El trabajador no existe", 404);
    }
    if (!(await existUser(Usuarioid))) {
      throw new HandleError("El usuario no existe", 404);
    }
    for (const copiaId of Copia_libroid) {
      if (!(await existBook(copiaId))) {
        throw new HandleError(
          `La copia ${copiaId} no existe o no está disponible`,
          404,
        );
      }
    }
    if (es_prestamo && es_venta) {
      throw new HandleError(
        "La transacción no puede ser préstamo y venta al mismo tiempo",
        400,
      );
    }
    if (!es_prestamo && !es_venta) {
      throw new HandleError("La transacción debe ser préstamo o venta", 400);
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      for (const copiaId of Copia_libroid) {
        const precio_total = issell ? await getBookPrice(copiaId) : 0; // ← solo aquí
        idTransaccion = randomUUID();
        await connection.query(
          `INSERT INTO transaccion (Trabajadorid, Usuarioid, Fecha, semestre, es_venta, es_prestamo, precio_total, Copia_libroid, id_Transaccion) 
           VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?)`,
          [
            Trabajadorid,
            Usuarioid,
            semestre,
            issell,
            isloan,
            precio_total,
            copiaId,
            idTransaccion,
          ],
        );
        ids.push(idTransaccion);
      }

      await connection.commit();
      connection.release();
      return { idsTransaccion: ids };
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    if (error instanceof HandleError) throw error;
    throw new HandleError(
      "Error al generar la transacción: " + error.message,
      500,
    );
  }
}
async function getBookPrice(copiaLibroId) {
  const query = `SELECT l.precio FROM copia_libro cl, libro l WHERE cl.Libroid = l.id AND cl.id = ?`;
  const result = await executeQuery(query, [copiaLibroId]);

  if (result.length === 0) {
    throw new HandleError("No se encontró el precio del libro", 404);
  }

  return result[0].precio;
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
      throw new HandleError(`El usuario No posee transacciones`, 404);
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
//Los 10 libros menos prestados de la categoría Comedia durante el segundo semestre del
//año 2025.
export async function showLessLoanComedy() {
  try {
    const querySearch = `SELECT l.Nombre FROM libro l, transaccion t, copia_libro cl 
WHERE l.Genero = 'Comedia' 
  AND t.es_prestamo = 1
  AND t.Copia_libroid = cl.id 
  AND cl.Libroid = l.id 
  AND t.Fecha >= '2025-07-01' 
  AND t.Fecha <= '2025-12-31' 
GROUP BY l.id 
ORDER BY COUNT(t.id) ASC 
LIMIT 10;`;
    
    const result = await executeQuery(querySearch);
    console.log(result);
    if (result.length === 0) {
      throw new HandleError("No hay libros de comedia prestados", 404);
    }
    return result;
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error interno del servidor", 500);
  }
}


import { executeQuery } from "../Db/Db.js";

import { HandleError } from "../Util/Error.js";
export async function addLibro(data) {
  const {
    nombre,
    genero,
    autor,
    fechaRecepcion,
    cantCopias,
    edadSugerida,
    editorial,
    precio,
    estado,
  } = data;

  try {
    //validamos si el libro ya existe por nombre y autor
    const querySelect = `SELECT * FROM libro WHERE nombre = ? AND autor = ?`;
    const resultSelect = await executeQuery(querySelect, [nombre, autor]);

    console.log("resultSelect: ", resultSelect.length);

    if (resultSelect.length > 0) {
      throw new HandleError("El libro ya existe", 409);
    }
    const query = `
    INSERT INTO Libro (
    Nombre, 
    Genero, 
    Autor, 
    fecha_recepcion, 
    cantidad_copias, 
    edad_sugerida, 
    editorial, 
    precio, 
    estado
    )   
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
    return await executeQuery(query, [
      nombre,
      genero,
      autor,
      fechaRecepcion,
      cantCopias,
      edadSugerida,
      editorial,
      precio,
      estado,
    ]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al agregar el libro: " + error.message, 500);
  }
}

/**
 *
 * @param {*} data
 * @returns
 */
export async function patchPriceBook(data) {
  const { id, precio } = data;

  try {
    //1. buscar el libro en la base de datos

    const querySelect = `SELECT * FROM libro WHERE id = ?`;
    const resultSelect = await executeQuery(querySelect, [id]);
    if (resultSelect.length === 0) {
      throw new HandleError("El libro no existe", 404);
    }
    //si recibimos un libro entonces actualizamos el precio
    if (resultSelect.length > 0) {
      const queryUpdate = `UPDATE libro SET precio = ? WHERE id = ?`;
      return await executeQuery(queryUpdate, [precio, id]);
    }
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }

    throw new HandleError("Error interno del servidor", 500);
  }
}

export async function postGenerateCopy(data) {
  const { id, codBarra } = data;

  try {
    console.log("data recibida: ", data);
    console.log({ id, codBarra });
    const querySelect = `SELECT * FROM libro WHERE id = ?`;
    const resultSelect = await executeQuery(querySelect, [id]);

    if (resultSelect.length === 0) {
      throw new HandleError("El libro no existe", 404);
    }
    //verificamos el codBarra no exista
    const querySelectCopy = `SELECT * FROM copia_libro WHERE codigo_barras = ?`;
    const resultSelectCopy = await executeQuery(querySelectCopy, [codBarra]);

    if (resultSelectCopy.length > 0) {
      throw new HandleError("El codBarra ya existe", 409);
    }

    //si el libro existe entonces generamos la copia y el codigo de barras tampoco existe entonces generamos la copia
    const queryInsert = `INSERT INTO copia_libro (codigo_barras, Libroid,estado) VALUES (?, ?, ?)`;
    return await executeQuery(queryInsert, [codBarra, id, 1]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }

    throw new HandleError("Error interno del servidor", 500);
  }
}
export async function disableCopyBook(data) {
  const { id } = data;
  try {
    //validamos si la copia ya esta deshabilitada
    const querySelectDisable = `SELECT * FROM copia_libro WHERE id = ? AND estado = 0`;
    const resultSelectDisable = await executeQuery(querySelectDisable, [id]);

    if (resultSelectDisable.length > 0) {
      throw new HandleError("La copia del libro ya esta deshabilitada", 409);
    }

    const querySelect = `SELECT * FROM copia_libro WHERE Libroid = ?`;
    const resultSelect = await executeQuery(querySelect, [id]);

    if (resultSelect.length === 0) {
      throw new HandleError("El copia del libro no existe", 404);
    }

    const queryUpdate = `UPDATE copia_libro SET estado = 0 WHERE id = ?`;
    return await executeQuery(queryUpdate, [id]);
    
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error interno del servidor", 500);
  }
}

export async function showBook() {

  try {
    
    const querySearch = 'SELECT * FROM libro;'
    const resultQuery= await executeQuery(querySearch);

    console.log(resultQuery);
    if (resultQuery.length === 0) {
      throw new HandleError("No hay libros", 404);
    }

    
    return resultQuery;

  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error interno del servidor", 500);
  }

}

import { executeQuery } from "../../Db/Db.js";
import { HandleError } from "../../Util/Error.js";
import { validateRut } from "../../Util/validateRut.js";
export async function addUser(data) {
  const { rut, nombre, direccion } = data;

  try {
    //Validamos si el usuario ya existe por rut
    const querySelect = `SELECT * FROM usuario WHERE rut = ?`;
    const resultSelect = await executeQuery(querySelect, [rut]);
    console.log("resultSelect: ", resultSelect.length);
    if (resultSelect.length > 0) {
      throw new HandleError("El usuario ya existe en el sistema", 409);
    }

    const query = `INSERT INTO usuario (rut,nombre,estado,direccion) VALUES (?, ?, ?, ?)`;
    return await executeQuery(query, [rut, nombre, 1, direccion]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al agregar el usuario: " + error.message, 500);
  }
}
export async function disableUser(data) {
  const { id } = data;
  try {
    const query = `SELECT * FROM usuario WHERE id = ?`;
    const result = await executeQuery(query, [id]);
    if (result.length === 0) {
      throw new HandleError("Usuario no encontrado", 404);
    }
    if (result[0].estado === 0) {
      throw new HandleError("El usuario ya está deshabilitado", 400);
    }
    const queryUpdate = `UPDATE usuario SET estado = 0 WHERE id = ?`;
    return await executeQuery(queryUpdate, [id]);
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError(
      "Error al deshabilitar el usuario: " + error.message,
      500,
    );
  }
}
export async function userLogin(data) {
  const { email, password } = data;
  try {
    // 1. Buscamos el usuario por credenciales sin importar el estado
    const query = `SELECT * FROM trabajador WHERE correo = ? AND contrasenia = ?`;
    const result = await executeQuery(query, [email, password]);

    // 2. Si no existe → credenciales incorrectas
    if (result.length === 0) {
      throw new HandleError("Usuario o contraseña incorrectos", 401);
    }

    // 3. Si existe pero está desactivado
    if (result[0].estado === 0) {
      throw new HandleError(
        "Su cuenta está desactivada, por favor contacte con un administrador",
        401,
      );
    }

    // 4. Todo OK → retornamos sus datos
    return {
      id: result[0].id,
      nombre: result[0].nombre,
      rol: result[0].contrasenia,
    };
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al iniciar sesión: " + error.message, 500);
  }
}
export async function registerUser(data) {
  const { nombre, rut, direccion, estado } = data;
  try {
    const querySelect = `SELECT * FROM usuario WHERE rut = ?`;
    const resultSelect = await executeQuery(querySelect, [rut]);

    if (resultSelect.length > 0) {
      throw new HandleError("El usuario ya existe en el sistema", 409);
    }

    const query = `INSERT INTO usuario (nombre,rut,direccion,estado) VALUES (?, ?, ?, ?)`;
    const result = await executeQuery(query, [nombre, rut, direccion, estado]);

    return {
      id: result.insertId,
      nombre: nombre,
      rut: rut,
      direccion: direccion,
      estado: estado,
    };
  } catch (error) {
    if (error instanceof HandleError) {
      throw error;
    }
    throw new HandleError("Error al agregar el usuario: " + error.message, 500);
  }
}
export async function showUsers() {
  try {
    const query = `SELECT id, nombre, rut, direccion, estado FROM usuario`;

    const result = await executeQuery(query);
    return result;
  } catch (error) {
    throw new HandleError(
      "Error al obtener los usuarios: " + error.message,
      500,
    );
  }
}

export async function registerWorker(data) {
  const { nombre, rut, correo, contrasenia, sueldo, bono, Rolid } = data;

  try {
    const querySelect = `SELECT * FROM trabajador WHERE rut = ?`;
    const resultSelect = await executeQuery(querySelect, [rut]);
    if (resultSelect.length > 0) {
      throw new HandleError("El trabajador ya existe en el sistema", 409);
    }

    const query = `INSERT INTO trabajador 
      (bono, contrasenia, correo, estado, nombre, rut, sueldo, Rolid) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    await executeQuery(query, [
      bono,
      contrasenia,
      correo,
      1,
      nombre,
      rut,
      sueldo,
      Rolid,
    ]);
    return {
      id: resultSelect.insertId,
      nombre: nombre,
      rut: rut,
      correo: correo,
      sueldo: sueldo,
      bono: bono,
      Rolid: Rolid,
    };
  } catch (error) {
    if (error instanceof HandleError) throw error;
    throw new HandleError(
      "Error al registrar el trabajador: " + error.message,
      500,
    );
  }
}
export async function showWorkersAndUser() {
  try {
    //recuperamos los usuarios normales
    const query = "SELECT * FROM usuario where estado = 1";
    const result = await executeQuery(query);
    //recuperamos los trabajadores = bibliotecarios
    const query2 = "SELECT * FROM trabajador where estado = 1 and rolid = 2";
    const result2 = await executeQuery(query2);

    return {
      usuarios: result,
      bibliotecaria: result2,
    };
  } catch (error) {
    throw new HandleError(
      "Error al obtener los usuarios y trabajadores: " + error.message,
      500,
    );
  }
}
export async function getUsersAndWorkersLoan() {
  try {
    const query = `SELECT * FROM usuario u,transaccion t WHERE u.id = t.usuarioid`;
    const result = await executeQuery(query);
    return result;
  } catch (error) {
    throw new HandleError(
      "Error al obtener los usuarios con prestamos: " + error.message,
      500,
    );
  }
}
export async function getAllLibrains() {
  try {
    const query = `SELECT * FROM trabajador WHERE rolid = 2`;
    const result = await executeQuery(query);
    return result;
  } catch (error) {
    throw new HandleError(
      "Error al obtener los bibliotecarios: " + error.message,
      500,
    );
  }
}

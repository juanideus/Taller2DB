import {
  addUser,
  disableUser,
  userLogin,
  registerUser,
  showUsers,
  registerWorker,
  showWorkersAndUser,
  getUsersAndWorkersLoan,
  getAllLibrains
} from "../../Model/User/User.js";
import { validateUserParse } from "../../Schema/User/User.schema.js";
import { validateUserDisableParse } from "../../Schema/User/UserDisable.schema.js";
import { validateLoginParse } from "../../Schema/User/Login.schema.js";
import { generateToken } from "../../Util/generateToken.js";
import { validateRegisterParse } from "../../Schema/User/Register.schema.js";
import { validateWorkerParse } from "../../Schema/User/Worker.schema.js";
export async function addUsuario(req, res) {
  const validator = validateUserParse(req.body);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const result = await addUser(validator.data);
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Usuario agregado exitosamente" });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al generar la copia del libro",
    });
  }
}
export async function disableUserbyId(req, res) {
  const validator = validateUserDisableParse(req.params);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const result = await disableUser(validator.data);
    if (result.affectedRows > 0) {
      return res.status(200).json({
        status: 200,
        message: "Usuario deshabilitado exitosamente",
      });
    }
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error al deshabilitar el usuario" });
  }
}
export async function login(req, res) {
  console.log("Login request body: ", req.body);
  const validator = validateLoginParse(req.body);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const { email, password } = validator.data;
    //nos contactamos con el servicio de autenticación para validar las credenciales
    const result = await userLogin({ email, password });
    if (result) {
      //generamos un token de autenticación (JWT) para el usuario
      const token = generateToken(result);
      res.cookie("token", token, {
        httpOnly: true, // ← JS del navegador NO puede leerla
        secure: false, // ← solo HTTPS en prod
        sameSite: "strict", // ← protección CSRF
        maxAge: 60 * 60 * 1000, // ← 1 hora en ms
      });
      res.status(200).json({
        status: 200,
        message: "Inicio de sesión exitoso",
        data: {
          id: result.id,
          nombre: result.nombre,
          rol: result.rol,
          token: token,
        },
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al iniciar sesión",
    });
  }
}
export async function register(req, res) {
  const validator = await validateRegisterParse(req.body);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }

  try {
    const result = await registerUser(validator.data);

    return res.status(201).json({
      status: 201,
      message: "Usuario registrado exitosamente",
      data: result, // ← devuelves todo el objeto { id, nombre, rut, ... }
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al registrar el usuario",
    });
  }
}
export async function showAllUsers(req, res) {
  try {
    const result = await showUsers();
    if (result.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontraron usuarios",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Usuarios obtenidos exitosamente",
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al obtener los usuarios",
    });
  }
}
export async function workerRegister(req, res) {
  try {
    const validator = validateWorkerParse(req.body);

    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }
    if (!validator.success) {
      return res.status(400).json({
        message: validator.error.errors.map((e) => e.message).join(", "),
      });
    }
    const result = await registerWorker(validator.data);

    return res.status(201).json({
      status: 201,
      message: "Trabajador registrado exitosamente",
      data: result,
    });
  } catch (error) {
    console.error("Error en workerRegister: ", error);
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al registrar el trabajador",
    });
  }
}
export async function getUsersAndWorkers(req, res) {
  try {
    const users = await showWorkersAndUser();
    if (users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontraron usuarios ni trabajadores",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Usuarios y trabajadores obtenidos exitosamente",
      data: {
        usuarios: users.usuarios,
        bibliotecarias: users.bibliotecaria,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al obtener los usuarios y trabajadores",
    });
  }
}
export async function getUsersLoan(req, res) {
  try {
    const users = await getUsersAndWorkersLoan();
    if (users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontraron usuarios con almenos 1 prestamo",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Usuarios con prestamos obtenidos exitosamente",
      data: users,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al obtener los usuarios con prestamos",
    });
  }
}
export async function getlibrains(req, res) {
  try {
      
    const users = await getAllLibrains();
    if (users.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "No se encontraron bibliotecarios",
        data: [],
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Bibliotecarios obtenidos exitosamente",
      data: users,
    });
  }catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Error al obtener los bibliotecarios",
    });
  }
}

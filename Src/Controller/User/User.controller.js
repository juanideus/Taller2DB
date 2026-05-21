import { addUser, disableUser } from "../../Model/User.js";
import { validateUserParse } from "../../Schema/User/User.schema.js";
import { validateUserDisableParse } from "../../Schema/User/UserDisable.schema.js";
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
    res
      .status(error.statusCode || 500)
      .json({
        message: error.message || "Error al generar la copia del libro",
      });
  }
}
export async function disableUserbyRut(req, res) {
  const validator = validateUserDisableParse(req.body);
  if (!validator.success) {
    return res.status(400).json({
      message: validator.error.errors.map((e) => e.message).join(", "),
    });
  }
  try {
    const result = await disableUser(validator.data);
    if (result.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Usuario deshabilitado exitosamente" });
    }
    
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Error al deshabilitar el usuario" });
  }
}

import jwt from "jsonwebtoken";

export function generateToken(data) {
  const { userId, name, role } = data;
  // Cargar variables de entorno
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
  const algorithm = process.env.JWT_ALGORITHM || "HS256";
  const issuer = process.env.JWT_ISSUER || "TALLER2";
  const audience = process.env.JWT_AUDIENCE || "TALLER2_2";
  // Crear el payload del token (puedes agregar más información si es necesario)
  const payload = {
    userId: userId,
    Name: name,
    Role: role,
  };
    // Generar el token
    const token = jwt.sign(payload, secretKey,{
    expiresIn: expiresIn,
    algorithm: algorithm,
    issuer: issuer,
    audience: audience,
    });
    return token;
}

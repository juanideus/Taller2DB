import mysql from "mysql2/promise";
import dotenv from "dotenv";
const result = dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getConnection = async () => {
  try {
    const connection = await pool.getConnection();
    if (connection) {
      console.log("Conexión a la base de datos establecida");
    }
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};
export const executeQuery = async (query, params) => {
  try {
    const rows = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    console.error("Error al ejecutar la consulta:", query, error);
    throw error;
  }
};

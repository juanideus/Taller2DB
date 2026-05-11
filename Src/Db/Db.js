import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "3004",
  database: "taller2",
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
const executeQuery = async (query, params) => {
    try{
        const rows = await pool.query(query, params);
        return rows[0];
    
    }catch(error){
        console.error("Error al ejecutar la consulta:",query, error);
        throw error;
    }
}

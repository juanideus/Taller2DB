import express from "express";
import cors from "cors";
import libroRouter from "./Router/Book.router.js";
import userRouter from "./Router/User.router.js";
import transactionRouter from "./Router/Transaction.router.js";
const app = express();
app.use(cors());
app.use(express.json());
// Rutas para libros 
app.use("/libros", libroRouter);
// Rutas para usuarios
app.use("/users", userRouter);
app.use("/transaction", transactionRouter);

app.listen(8080, () => {
  console.log("Servidor corriendo en el link http://localhost:8080");
});

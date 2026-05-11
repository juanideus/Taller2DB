import express from 'express';
import cors from 'cors';
import libroRouter from './Router/Libro.Router.js';
import userRouter from './Router/User.router.js';
const app = express();
app.use(cors());
app.use(express.json());

app.use('/libros',libroRouter);
app.use('/users',userRouter);
app.listen(3000, () => {
    console.log("Servidor corriendo en el link http://localhost:3000");
});



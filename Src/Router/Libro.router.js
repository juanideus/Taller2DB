import { Router } from "express";
import addLibros from "../Controller/Libro.controller.js";
const router = Router();

router.post('/', addLibros)

export default router;
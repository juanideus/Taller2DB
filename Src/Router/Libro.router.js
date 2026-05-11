import { Router } from "express";
import {addLibros,patchPriceBooks} from "../Controller/Libro/Libro.controller.js";

const router = Router();

router.post('/', addLibros)
router.patch('/', patchPriceBooks)

export default router;
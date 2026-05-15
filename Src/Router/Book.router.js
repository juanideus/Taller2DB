import { Router } from "express";
import {addLibros,patchPriceBooks,generateCopy} from "../Controller/Book/Book.controller.js";

const router = Router();

router.post('/', addLibros)
router.post('/:id', generateCopy)
router.patch('/', patchPriceBooks)

export default router;
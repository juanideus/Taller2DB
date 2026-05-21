import { Router } from "express";
import {addLibros,patchPriceBooks,generateCopy, disableBook, getAllBooks} from "../Controller/Book/Book.controller.js";

const router = Router();

router.post('/', addLibros)
router.post('/copy', generateCopy)
router.patch('/', patchPriceBooks)
router.patch('/disable',disableBook )
router.get('/', getAllBooks)

export default router;
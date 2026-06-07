import { Router } from "express";
import {addLibros,patchPriceBooks,generateCopy, disableBook, getAllBooks,updateStock} from "../Controller/Book/Book.controller.js";

const router = Router();

router.post('/', addLibros)
router.post('/copy', generateCopy)
router.patch('/:id', patchPriceBooks)
router.patch('/disable/:id',disableBook )
router.get('/', getAllBooks)
router.patch('/updateStock/:id',updateStock)

export default router;
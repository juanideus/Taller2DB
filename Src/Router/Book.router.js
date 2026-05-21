import { Router } from "express";
import {addLibros,patchPriceBooks,generateCopy, disableBook} from "../Controller/Book/Book.controller.js";

const router = Router();

router.post('/', addLibros)
router.post('/copy', generateCopy)
router.patch('/', patchPriceBooks)
router.patch('/disable',disableBook )

export default router;
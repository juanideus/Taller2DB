import { Router } from "express"
import { Transaction,getDetailsTransactionById,showComedy,sellInYear } from "../Controller/Transaction/Transaction.controller.js";
const router = Router();


router.post("/", Transaction);
router.get("/details", getDetailsTransactionById);
router.get("/comedia", showComedy);
router.get("/ventas",sellInYear)
export default router;

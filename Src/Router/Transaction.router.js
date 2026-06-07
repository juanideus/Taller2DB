import { Router } from "express"
import { Transaction,getDetailsTransactionById,showComedy,sellInYear, showFiction } from "../Controller/Transaction/Transaction.controller.js";
const router = Router();


router.post("/", Transaction);
router.get("/details", getDetailsTransactionById);
router.get("/comedia", showComedy);
router.get("/ventas",sellInYear);
router.get("/fiction", showFiction);
export default router;

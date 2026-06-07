import { Router } from "express"
import { Transaction,getDetailsTransactionById,showComedy } from "../Controller/Transaction/Transaction.controller.js";
const router = Router();


router.post("/", Transaction);
router.get("/details", getDetailsTransactionById);
router.get("/comedia", showComedy);
export default router;

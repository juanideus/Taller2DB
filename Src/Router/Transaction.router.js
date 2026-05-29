import { Router } from "express"
import { Transaction,getDetailsTransactionById } from "../Controller/Transaction/Transaction.controller.js";
const router = Router();


router.post("/", Transaction);
router.get("/details", getDetailsTransactionById);
export default router;

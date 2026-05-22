import { Router } from "express"
import { Transaction } from "../Controller/Transaction/Transaction.controller.js";
const router = Router();


router.post("/", Transaction);
export default router;

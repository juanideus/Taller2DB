import { Router } from "express";
import {
  addUsuario,
  disableUserbyRut,
} from "../Controller/User/User.controller.js";

const router = Router();

router.post("/", addUsuario);
router.patch("/disable", disableUserbyRut);

export default router;
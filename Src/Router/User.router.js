import { Router } from "express";
import {
  addUsuario,
  disableUserbyId,
  login,
  register,
  showAllUsers,
  workerRegister,
  getUsersAndWorkers,
  getUsersLoan,
  getlibrains,
} from "../Controller/User/User.controller.js";

const router = Router();

router.post("/", addUsuario);
router.post("/register", register);
router.post("/trabajador/registrarTrabajador", workerRegister);
router.patch("/disable/:id", disableUserbyId);
router.post("/login", login);
router.get("/", showAllUsers);
router.get("/users-workers", getUsersAndWorkers);
router.get("/loan", getUsersLoan);
router.get("/librains", getlibrains);


export default router;
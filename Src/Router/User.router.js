
import {Router} from "express";
import addUsuario from "../Controller/User/User.controller.js";

const router = Router();

router.post('/', addUsuario);


export default router;
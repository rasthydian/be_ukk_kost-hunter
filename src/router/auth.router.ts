import { Router } from "express";
import {registerUser, loginUser} from "../controller/auth.controller";
import { validateLogin, validateRegister } from "../middleware/auth.validation";


const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
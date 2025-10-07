import { Router } from "express";
import {registerUser, loginUser} from "../controller/user.controller";
import { validateLogin, validateRegister } from "../middleware/user.validation";


const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
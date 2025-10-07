import { Router } from "express";
import { registerUser, loginUser } from "../../controller/auth.controller";
import { validateLogin, validateRegister } from "../../middleware/auth.validation";

const router = Router();

// route global (tidak perlu token)
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;

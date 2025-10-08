import { Router } from "express";
import { registerUser, loginUser } from "../../controller/auth.controller";
import { validateLogin, validateRegister } from "../../middleware/auth.validation";
import { verifyToken } from "../../middleware/authorization";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../controller/user.controller";

const router = Router();


router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile/:id", getUserById);
router.put("/profile-update/:id", verifyToken, updateUser);
router.delete("/profile/:id", deleteUser);

export default router;

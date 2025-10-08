import { Router } from "express";

import { validateLogin, validateRegister } from "../../middleware/auth.validation";
import { verifyToken } from "../../middleware/authorization";

import { registerUser, loginUser } from "../../controller/auth.controller";
import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../controller/user.controller";
import { getAllKos, getKosById } from "../../controller/kost.controller";

const router = Router();


// User Routes
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/profile/:id", getUserById);
router.put("/profile-update/:id", verifyToken, updateUser);
router.delete("/profile/:id", deleteUser);

// Kost Routes
router.get("/kost", getAllKos);
router.get("/kost/:id", verifyToken, getKosById);

export default router;

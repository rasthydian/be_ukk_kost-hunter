import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controller/user.controller";
import { verifyToken, authorizeRole } from "../../middleware/authorization";
import { validateUpdateUser } from "../../middleware/user.validation";
import { validateLogin, validateRegister } from "../../middleware/auth.validation";
import { loginUser, registerUser } from "../../controller/auth.controller";

const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

// route khusus admin/owner
router.use(verifyToken, authorizeRole("OWNER"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;

import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controller/user.controller";
import { verifyToken, authorizeRole } from "../../middleware/authorization";
import { validateUpdateUser } from "../../middleware/user.validation";

const router = Router();

// route khusus admin/owner
router.use(verifyToken, authorizeRole("OWNER"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

export default router;

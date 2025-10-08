import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../controller/user.controller";
import { loginUser, registerUser } from "../../controller/auth.controller";
import { createKos, updateKos, getAllKos, getKosById, deleteKos, uploadKosImage, updateKosImage } from "../../controller/kost.controller";

import { verifyToken, authorizeRole } from "../../middleware/authorization";
import { validateUpdateUser } from "../../middleware/user.validation";
import { validateLogin, validateRegister } from "../../middleware/auth.validation";
import { validateCreateKos, validateUpdateKos } from "../../middleware/kost.validation";
import multer from "../../utils/uploadKos";

const router = Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);


router.use(verifyToken, authorizeRole("OWNER"));

// User Management Routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUpdateUser, updateUser);
router.delete("/:id", deleteUser);

// Kost Owner Routes
router.post("/kost", validateCreateKos, createKos);
router.get("/kost/:id",  getKosById);
router.put("/kost/:id", validateUpdateKos, updateKos);
router.delete("/kost/:id", deleteKos);

router.post("/kost/:id/image", multer.array("images", 5), uploadKosImage);
router.put("/kost/:id/image", multer.array("images", 5), updateKosImage);



export default router;

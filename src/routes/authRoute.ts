import { Router } from "express";
import {
  login,
  register,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddlewares.js"; 

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", authenticate, getUsers);
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

export default router;
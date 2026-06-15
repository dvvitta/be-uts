import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddlewares.js"; 

const router = Router();

// Semua rute CRUD User mengambil fungsi dari userController
router.get("/users", authenticate, getUsers);
router.get("/users/:id", authenticate, getUserById);
router.put("/users/:id", authenticate, updateUser);
router.delete("/users/:id", authenticate, deleteUser);

export default router;
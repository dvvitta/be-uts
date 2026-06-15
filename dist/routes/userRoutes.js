"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_js_1 = require("../controllers/userController.js");
const authMiddlewares_js_1 = require("../middlewares/authMiddlewares.js");
const router = (0, express_1.Router)();
// Semua rute CRUD User mengambil fungsi dari userController
router.get("/users", authMiddlewares_js_1.authenticate, userController_js_1.getUsers);
router.get("/users/:id", authMiddlewares_js_1.authenticate, userController_js_1.getUserById);
router.put("/users/:id", authMiddlewares_js_1.authenticate, userController_js_1.updateUser);
router.delete("/users/:id", authMiddlewares_js_1.authenticate, userController_js_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
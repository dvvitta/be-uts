"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma"));
const getUsers = async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Get Users Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Get User By ID Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updateData = {
            name,
            email,
        };
        if (password && password.trim() !== "") {
            updateData.password = await bcrypt_1.default.hash(password, 10);
        }
        const user = await prisma_1.default.user.update({
            where: {
                id: Number(id),
            },
            data: updateData,
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        return res.status(200).json({
            message: "User berhasil diupdate",
            data: user,
        });
    }
    catch (error) {
        console.error("Update User Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.user.delete({
            where: {
                id: Number(id),
            },
        });
        return res.status(200).json({
            message: "User berhasil dihapus",
        });
    }
    catch (error) {
        console.error("Delete User Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map
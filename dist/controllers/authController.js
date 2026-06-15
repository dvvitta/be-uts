"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log("Register Request Email:", email);
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "Email, password, dan name wajib diisi",
            });
        }
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email sudah digunakan",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return res.status(201).json({
            message: "Register berhasil",
            data: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        });
    }
    catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email dan password wajib diisi",
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Email atau password salah",
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Email atau password salah",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res.json({
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Terjadi kesalahan server",
        });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map
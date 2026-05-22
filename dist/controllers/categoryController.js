"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.createCategory = exports.getCategories = void 0;
const db_1 = require("../lib/db");
//1. menampilkan semua category
const getCategories = async (req, res) => {
    try {
        const allCategory = await db_1.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(allCategory);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Data category gagal dimuat",
        });
    }
};
exports.getCategories = getCategories;
//2. membuat category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Nama category wajib diisi",
            });
        }
        const newCategory = await db_1.prisma.category.create({
            data: {
                name,
            },
        });
        res.status(201).json({
            message: "Category berhasil ditambahkan",
            data: newCategory,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Terjadi kesalahan saat menambahkan category",
        });
    }
};
exports.createCategory = createCategory;
//3. mengambil category berdasarkan id
const getCategoryById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await db_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        res.json(category);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal mengambil detail category",
        });
    }
};
exports.getCategoryById = getCategoryById;
//4. update category
const updateCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Nama category tidak boleh kosong",
            });
        }
        const existingCategory = await db_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!existingCategory) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        const updatedCategory = await db_1.prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });
        res.json({
            message: "Category berhasil diperbarui",
            data: updatedCategory,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Update category gagal",
        });
    }
};
exports.updateCategory = updateCategory;
//5. hapus category
const deleteCategory = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const category = await db_1.prisma.category.findUnique({
            where: {
                id,
            },
        });
        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }
        await db_1.prisma.category.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Category berhasil dihapus",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Penghapusan category gagal",
        });
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map
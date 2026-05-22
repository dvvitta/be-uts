import { prisma } from "../lib/db";
import { Request, Response } from "express";


//1. menampilkan semua category
export const getCategories = async (req: Request, res: Response) => {
  try {
    const allCategory = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(allCategory);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Data category gagal dimuat",
    });
  }
};

//2. membuat category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama category wajib diisi",
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      message: "Category berhasil ditambahkan",
      data: newCategory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan category",
    });
  }
};

//3. mengambil category berdasarkan id
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
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
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Gagal mengambil detail category",
    });
  }
};

//4. update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Nama category tidak boleh kosong",
      });
    }

    const existingCategory = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!existingCategory) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    const updatedCategory = await prisma.category.update({
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
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update category gagal",
    });
  }
};

//5. hapus category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category tidak ditemukan",
      });
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Category berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Penghapusan category gagal",
    });
  }
};

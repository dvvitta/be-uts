import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error("Get User By ID Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const updateData: any = {
      name,
      email,
    };

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
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
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      message: "User berhasil dihapus",
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};
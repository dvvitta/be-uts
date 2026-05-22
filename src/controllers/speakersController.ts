import { Request, Response } from "express";
import { prisma } from "../lib/db";

//1. menampilkan semua speaker
export const getSpeakers = async (req: Request, res: Response) => {
  try {
    const speakers = await prisma.speaker.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(speakers);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Data speaker gagal dimuat",
    });
  }
};

//2. membuat speaker
export const createSpeaker = async (req: Request, res: Response) => {
  try {
    const { name, role, image } = req.body;

    if (!name || !role || !image) {
      return res.status(400).json({
        message: "Nama, role, dan image wajib diisi",
      });
    }

    const newSpeaker = await prisma.speaker.create({
      data: {
        name,
        role,
        image,
      },
    });

    res.status(201).json({
      message: "Speaker berhasil ditambahkan",
      data: newSpeaker,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Gagal menambahkan speaker",
    });
  }
};

//3. mengambil speaker berdasarkan id
export const getSpeakerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const speaker = await prisma.speaker.findUnique({
      where: {
        id,
      },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker tidak ditemukan",
      });
    }

    res.json(speaker);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Gagal mengambil detail speaker",
    });
  }
};

//4. update speaker
export const updateSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name, role, image } = req.body;

    const speaker = await prisma.speaker.findUnique({
      where: {
        id,
      },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker tidak ditemukan",
      });
    }

    const updatedSpeaker = await prisma.speaker.update({
      where: {
        id,
      },

      data: {
        name,
        role,
        image,
      },
    });

    res.json({
      message: "Speaker berhasil diperbarui",
      data: updatedSpeaker,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update speaker gagal",
    });
  }
};

//5. hapus speaker
export const deleteSpeaker = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const speaker = await prisma.speaker.findUnique({
      where: {
        id,
      },
    });

    if (!speaker) {
      return res.status(404).json({
        message: "Speaker tidak ditemukan",
      });
    }

    await prisma.speaker.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Speaker berhasil dihapus",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Penghapusan speaker gagal",
    });
  }
};

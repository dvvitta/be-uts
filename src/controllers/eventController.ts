import { Request, Response } from "express";
import { prisma } from "../lib/db";

// 1. menampilkan semua event 
export const getEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // Mengambil relasi objek category dan speaker sekaligus
      include: {
        category: true, 
        speaker: true,  
      },
    });

    res.json(allEvents);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data event gagal ditampilkan",
    });
  }
};

// 2. membuat event
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, location, dateEvent, description, categoryId, speakerId } =
      req.body;

    if (!name || !location || !dateEvent || !categoryId || !speakerId) {
      return res.status(400).json({
        message: "Semua data wajib diisi",
      });
    }

    const newEvent = await prisma.event.create({
      data: {
        name,
        location,
        dateEvent: new Date(dateEvent),
        description,
        categoryId: Number(categoryId),
        speakerId: Number(speakerId),
      },
    });

    res.status(201).json({
      message: "Event berhasil ditambahkan",
      data: newEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal menambahkan event",
    });
  }
};

// 3. mengambil event berdasarkan id (DITAMBAHKAN INCLUDE RELASI CATEGORY & SPEAKER)
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      // Agar saat form edit/update di-render, data dropdown kategori & speaker terisi otomatis
      include: {
        category: true,
        speaker: true,  // <-- TAMBAHKAN BARIS INI
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Gagal mengambil detail event",
    });
  }
};

// 4. update event
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, location, dateEvent, description, categoryId, speakerId } =
      req.body;

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        name,
        location,
        ...(dateEvent && {
          dateEvent: new Date(dateEvent),
        }),
        description,
        ...(categoryId && {
          categoryId: Number(categoryId),
        }),
        ...(speakerId && {
          speakerId: Number(speakerId),
        }),
      },
    });

    res.json({
      message: "Event berhasil diperbarui",
      data: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Update event gagal",
    });
  }
};

// 5. hapus event
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Event berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Penghapusan event gagal",
    });
  }
};
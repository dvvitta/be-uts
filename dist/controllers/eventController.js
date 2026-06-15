"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.createEvent = exports.getEvents = void 0;
const db_1 = require("../lib/db");
// 1. menampilkan semua event 
const getEvents = async (req, res) => {
    try {
        const allEvents = await db_1.prisma.event.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Data event gagal ditampilkan",
        });
    }
};
exports.getEvents = getEvents;
// 2. membuat event
const createEvent = async (req, res) => {
    try {
        const { name, location, dateEvent, description, categoryId, speakerId } = req.body;
        if (!name || !location || !dateEvent || !categoryId || !speakerId) {
            return res.status(400).json({
                message: "Semua data wajib diisi",
            });
        }
        const newEvent = await db_1.prisma.event.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal menambahkan event",
        });
    }
};
exports.createEvent = createEvent;
// 3. mengambil event berdasarkan id (DITAMBAHKAN INCLUDE RELASI CATEGORY & SPEAKER)
const getEventById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await db_1.prisma.event.findUnique({
            where: {
                id,
            },
            // Agar saat form edit/update di-render, data dropdown kategori & speaker terisi otomatis
            include: {
                category: true,
                speaker: true, // <-- TAMBAHKAN BARIS INI
            },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        res.json(event);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal mengambil detail event",
        });
    }
};
exports.getEventById = getEventById;
// 4. update event
const updateEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, location, dateEvent, description, categoryId, speakerId } = req.body;
        const event = await db_1.prisma.event.findUnique({
            where: {
                id,
            },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        const updatedEvent = await db_1.prisma.event.update({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Update event gagal",
        });
    }
};
exports.updateEvent = updateEvent;
// 5. hapus event
const deleteEvent = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const event = await db_1.prisma.event.findUnique({
            where: {
                id,
            },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event tidak ditemukan",
            });
        }
        await db_1.prisma.event.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Event berhasil dihapus",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Penghapusan event gagal",
        });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=eventController.js.map
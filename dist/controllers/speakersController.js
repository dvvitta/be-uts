"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpeaker = exports.updateSpeaker = exports.getSpeakerById = exports.createSpeaker = exports.getSpeakers = void 0;
const db_1 = require("../lib/db");
//1. menampilkan semua speaker
const getSpeakers = async (req, res) => {
    try {
        const speakers = await db_1.prisma.speaker.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(speakers);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Data speaker gagal dimuat",
        });
    }
};
exports.getSpeakers = getSpeakers;
//2. membuat speaker
const createSpeaker = async (req, res) => {
    try {
        const { name, role, image } = req.body;
        if (!name || !role || !image) {
            return res.status(400).json({
                message: "Nama, role, dan image wajib diisi",
            });
        }
        const newSpeaker = await db_1.prisma.speaker.create({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal menambahkan speaker",
        });
    }
};
exports.createSpeaker = createSpeaker;
//3. mengambil speaker berdasarkan id
const getSpeakerById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const speaker = await db_1.prisma.speaker.findUnique({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Gagal mengambil detail speaker",
        });
    }
};
exports.getSpeakerById = getSpeakerById;
//4. update speaker
const updateSpeaker = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { name, role, image } = req.body;
        const speaker = await db_1.prisma.speaker.findUnique({
            where: {
                id,
            },
        });
        if (!speaker) {
            return res.status(404).json({
                message: "Speaker tidak ditemukan",
            });
        }
        const updatedSpeaker = await db_1.prisma.speaker.update({
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Update speaker gagal",
        });
    }
};
exports.updateSpeaker = updateSpeaker;
//5. hapus speaker
const deleteSpeaker = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const speaker = await db_1.prisma.speaker.findUnique({
            where: {
                id,
            },
        });
        if (!speaker) {
            return res.status(404).json({
                message: "Speaker tidak ditemukan",
            });
        }
        await db_1.prisma.speaker.delete({
            where: {
                id,
            },
        });
        res.json({
            message: "Speaker berhasil dihapus",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Penghapusan speaker gagal",
        });
    }
};
exports.deleteSpeaker = deleteSpeaker;
//# sourceMappingURL=speakersController.js.map
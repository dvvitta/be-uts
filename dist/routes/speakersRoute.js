"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const speakersController_1 = require("../controllers/speakersController");
const router = (0, express_1.Router)();
router.get("/", speakersController_1.getSpeakers);
router.post("/", speakersController_1.createSpeaker);
router.get("/:id", speakersController_1.getSpeakerById);
router.put("/:id", speakersController_1.updateSpeaker);
router.delete("/:id", speakersController_1.deleteSpeaker);
exports.default = router;
//# sourceMappingURL=speakersRoute.js.map
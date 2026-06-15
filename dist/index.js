"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const eventRoute_1 = __importDefault(require("./routes/eventRoute"));
const categoryRoute_1 = __importDefault(require("./routes/categoryRoute"));
const speakersRoute_1 = __importDefault(require("./routes/speakersRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Ini adalah api untuk aplikasi invofest!");
});
app.use("/events", eventRoute_1.default);
app.use("/categories", categoryRoute_1.default);
app.use("/speakers", speakersRoute_1.default);
app.use("/auth", authRoute_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
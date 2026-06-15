import express from "express";
import cors from "cors";
import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import speakerRoute from "./routes/speakersRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Ini adalah api untuk aplikasi invofest!")
})

app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/speakers", speakerRoute);
app.use("/auth", authRoute);
app.use("/auth", userRoute); 

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
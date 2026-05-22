import express from "express";
import cors from "cors";
import eventRoute from "../src/routes/eventRoute";
import categoryRoute from "../src/routes/categoryRoute";
import speakerRoute from "../src/routes/speakersRoute";

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
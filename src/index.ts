import "dotenv/config";
import express, { Request, Response } from "express";
import moviesRouter from "./routes/movies";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/movies", moviesRouter);

app.get("/health", (req: Request, res: Response) => {
    res.json({ status: "Server is running!" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
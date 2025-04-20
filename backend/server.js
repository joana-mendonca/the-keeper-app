import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/db.js";
import NoteRoutes from "./routes/note.route.js";

/* Gets values from .env file */
dotenv.config();

const app = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === "development") {
    app.use(cors());
} else {
    app.use(cors({
        origin: 'http://localhost:5000'
    }));
}

const __dirname = path.resolve();

/* Middleware that allows to accept JSON data in the request body */
app.use(express.json());


/* Route created for products */
app.use("/api/notes", NoteRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get("/*splat", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });

}

try {
    app.listen(port, () => {
        connectDB();
        console.log("Server running at http://localhost:" + port);
    });
} catch (error) {
    console.error("Server failed to start:", error);
}
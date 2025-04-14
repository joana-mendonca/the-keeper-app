import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import NoteRoutes from "./routes/note.route.js";

/* Gets values from .env file */
dotenv.config();

const app = express();
const port = process.env.PORT;

/* Middleware that allows to accept JSON data in the request body */
app.use(express.json());

/* Route created for products */
app.use("/api/note", NoteRoutes);

app.listen(port, () => {
    connectDB();
    console.log("Server started at http://localhost:" + port);
});
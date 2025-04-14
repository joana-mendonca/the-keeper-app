import mongoose from "mongoose";

import Note from '../models/note.model.js';


export const getNotes = async (request, response) => {
    try {
        const notes = await Note.find({});
        response.status(200).json({ success: true, data: notes })
    } catch (error) {
        console.error("Error fetching the note:", error.message);
        response.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createNote = async (request, response) => {
    const note = request.body;

    console.log(note.title + ": " + note.description);

    if (!note.title || !note.description) {
        return response.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newNote = new Note(note);

    try {
        await newNote.save(); //Adds note to the db
        response.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Error creating note:", error.message);
        response.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updateNote = async (request, response) => {
    const { id } = request.params;
    const note = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Invalid Note Id" });
    }

    try {
        const updatedProduct = await Note.findByIdAndUpdate(id, note, { new: true }); //Updates note from db
        response.status(200).json({ success: true, message: updatedProduct });
    } catch (error) {
        console.error("Error updating the note:", error.message);
        response.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteNote = async (request, response) => {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "Invalid Note Id" });
    }

    try {
        await Note.findByIdAndDelete(id); //Deletes note from db
        response.status(200).json({ success: true, message: "Note deleted" });
    } catch (error) {
        console.error("Error deleting the note:", error.message);
        response.status(500).json({ success: false, message: "Server Error" });
    }
}
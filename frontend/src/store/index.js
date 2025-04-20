import { create } from "zustand";

export const useNoteStore = create((set, get) => ({
	url: "http://localhost:5000/api/notes",
	notes: [],
	setNotes: (notes) => set({ notes }),
	createNote: async (newNote) => {
		if (!newNote.title || !newNote.description) {
			return { success: false, message: "Please fill in all fields." };
		}
		const { url } = get();
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newNote),
		});
		const data = await res.json();
		set((state) => ({ notes: [...state.notes, data.data] }));

		return { success: true, message: "Note created successfully" };
	},
	fetchNotes: async () => {
		const { url } = get();
		const res = await fetch(url);
		const data = await res.json();
		set({ notes: data.data });
	},
	deleteNote: async (pid) => {
		const { url } = get();
		const res = await fetch(`${url}/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ notes: state.notes.filter((note) => note._id !== pid) }));

		return { success: true, message: data.message };
	},
	updateNote: async (pid, updatedNote) => {
		const { url } = get();
		const res = await fetch(`${url}/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedNote),
		});
		const data = await res.json();

		if (!data.success) return { success: false, message: data.message };

		// If the update is successful, update the state immediately with the updated note
		set((state) => {
			const updatedNotes = state.notes.map((note) =>
				note._id === pid ? { ...note, ...updatedNote } : note
			);
			return { notes: updatedNotes };
		});

		return { success: true, message: data.message };
	},
}));
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useNoteStore } from "../store";

function App() {
  const { fetchNotes, notes } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);
  console.log("Notes", notes);

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea />
      {notes
        .filter((note) => note && note._id)
        .map((note) => {
          return (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              description={note.description}
              onDelete={deleteNote}
            />
          );
        })}
      <Footer />
    </div>
  );
}

export default App;

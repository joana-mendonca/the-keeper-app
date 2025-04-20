import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import { useNoteStore } from "../store";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    description: "",
  });

  const { createNote } = useNoteStore();
  
  const handleAddNote = async () => {
		const { success, message } = await createNote(note);
    console.log("success=" + success);
    console.log("message=" + message);
    setNote({ title: "", description: ""});
	};

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {/* isEpanded ? (...) : null */}
        {isExpanded && (
          <input
            name="title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="description"
          onClick={expand}
          onChange={(e) => setNote({ ...note, description: e.target.value })}
          value={note.description}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleAddNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;

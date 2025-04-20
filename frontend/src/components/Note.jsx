import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNoteStore } from "../store";

function Note(props) {
  const { deleteNote, updateNote } = useNoteStore();

  // Delete note function 
  const handleDeleteNote = async (pid) => {
    const { success, message } = await deleteNote(pid);
    console.log(pid);
    console.log("success=" + success);
    console.log("message=" + message);
  };

  // Edit note functions
  const handleEditNote = async (pid, updatedNote) => {
    const { success, message } = await updateNote(pid, updatedNote);
    console.log("success=" + success);
    console.log("message=" + message);
  };

  const [open, setOpen] = React.useState(false);
  const [editedNote, setEditedNote] = React.useState({
    title: props.title,
    description: props.description,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    handleEditNote(props.id, editedNote);
    handleClose();
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <button onClick={() => handleDeleteNote(props.id)}>
        <DeleteIcon />
      </button>
      <React.Fragment>
        <button onClick={handleClickOpen}>
          <EditNoteRoundedIcon />
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              component: 'form',
              onSubmit: handleSubmitEdit,
            },
          }}
        >
          <DialogTitle>Edit Note</DialogTitle>
          <DialogContent>
            <input type="hidden" name="id" value={props.id} />
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              value={editedNote.title}
              onChange={handleFieldChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              value={editedNote.description}
              onChange={handleFieldChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Edit</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Note;

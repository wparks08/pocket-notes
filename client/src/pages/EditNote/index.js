import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import NoteForm from "../../components/NoteForm";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditNote() {
    const { id } = useParams();
    const [noteId, setNoteId] = useState(id);
    const [note, setNote] = useState({
        date: "",
        username: "",
        category: "",
        title: "",
        body: ""
    });
    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState({
        severity: "success",
        message: "default message"
    });

    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = () => {
        if (noteId === "new") {
            return;
        }
        API.getNote(noteId)
            .then(res => setNote(res.data))
            .catch(err => console.log(err));
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setNote({ ...note, [name]: value });
    };

    const handleFormSubmit = () => {
        setSaving(true);
        const saveOrUpdate = noteId === "new" ? API.saveNote(note) : API.updateNote(note);
        saveOrUpdate
            .then(result => {
                if (noteId === "new") {
                    setNoteId(result.data._id);
                    setNote({ ...note, _id: result.data._id });
                }
                loadNote();
                showSnackbar("success", "Note saved");
            })
            .catch(err => {
                console.log(err);
                showSnackbar("error", "An error occurred");
            });
    };

    const showSnackbar = (severity, message) => {
        setSaving(false);
        setSnackbarMessage({ severity, message });
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/notes">Notes</Link>
                <Typography color="textPrimary">{id === "new" ? "New Note" : "Edit Note"}</Typography>
            </Breadcrumbs>
            <NoteForm
                note={note}
                handleFormSubmit={handleFormSubmit}
                handleChange={handleChange}
                setNote={setNote}
                saving={saving}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarMessage.severity}>
                    {snackbarMessage.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default EditNote;

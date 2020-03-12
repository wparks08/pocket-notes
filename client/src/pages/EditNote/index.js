import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import NoteForm from "../../components/NoteForm";
import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditNote() {
    const { id } = useParams();
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
        API.getNote(id)
            .then(res => setNote(res.data))
            .catch(err => console.log(err));
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setNote({ ...note, [name]: value });
    };

    const handleFormSubmit = () => {
        setSaving(true);
        API.updateNote(note)
            .then(() => {
                loadNote();
                setSaving(false);
                setSnackbarMessage({ severity: "success", message: "Note saved" });
                setOpen(true);
            })
            .catch(err => {
                console.log(err)
                setSaving(false);
                setSnackbarMessage({ severity: "error", message: "An error occurred." });
                setOpen(true);
            });
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
                <Typography color="textPrimary">Edit Note</Typography>
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

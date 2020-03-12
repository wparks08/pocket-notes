import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextEditor from "../../components/TextEditor";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import NoteForm from "../../components/NoteForm";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function EditNote(props) {
    const classes = useStyles();

    const { id } = useParams();
    const [note, setNote] = useState({
        date: "",
        username: "",
        category: "",
        title: "",
        body: ""
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
        API.updateNote(note)
            .then(() => loadNote())
            .catch(err => console.log(err));
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
            />
        </Container>
    );
}

export default EditNote;

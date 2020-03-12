import React, { useEffect, useState } from "react";

import API from "../../utils/API";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import TextEditor from "../../components/TextEditor";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    },
    spacingTop: {
        marginTop: theme.spacing(6)
    },
    editorWrapper: {
        marginTop: theme.spacing(2)
    }
}));

function Notes() {
    // Setting our component's initial state
    const classes = useStyles();
    const [notes, setNotes] = useState([]);
    // const [secondary, setSecondary] = React.useState(false);
    const [formObject, setFormObject] = useState({
        noteName: "",
        Type: "",
        Description: ""
    });
    const [currentNote, setCurrentNote] = useState({
        _id: "",
        title: "",
        category: "",
        body: ""
    });

    useEffect(() => {
        loadNotes();
        if (currentNote) {
            console.log("need to send the note to the text editor");
        }
    }, []);

    function loadNotes() {
        API.getNotes("johnsmith")
            .then(res => {
                console.log(res);
                setNotes(res.data);
            })
            .catch(err => console.log(err));
    }

    const handleNoteClick = id => {
        const note = notes.find(note => note._id === id);
        setCurrentNote({
            _id: note._id || "",
            title: note.title || "",
            category: note.category || "",
            body: note.body || ""
        });
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setCurrentNote({ ...currentNote, [name]: value });
    };

    function deleteNote(id) {
        API.deleteNote(id)
            .then(() => loadNotes())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    // When the form is submitted, use the API.saveNote method to save the Note data
    // Then reload notes from the database
    const handleFormSubmit = () => {
        console.log("handle form submit");
        currentNote._id
            ? API.updateNote(currentNote)
                  .then(() => loadNotes())
                  .catch(err => console.log(err))
            : API.saveNote(currentNote)
                  .then(() => loadNotes())
                  .catch(err => console.log(err));
    };

    return (
        <Container>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h3">Create/Delete Notes</Typography>

                    <form>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="title"
                                    name="title"
                                    label="Title"
                                    fullWidth
                                    required
                                    value={currentNote.title}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    id="category"
                                    name="category"
                                    label="Category"
                                    fullWidth
                                    required
                                    value={currentNote.category}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container className={classes.editorWrapper}>
                            <Grid item xs={12}>
                                <TextEditor setCurrentNote={setCurrentNote} currentNote={currentNote} />
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    onClick={handleFormSubmit}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <Grid item size="md-6 sm-12" className={classes.spacingTop}>
                    <Typography variant="h3">List Of Notes</Typography>

                    {notes.length ? (
                        <List>
                            {notes.map((note, index) => (
                                <ListItem key={note._id}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={note.title} secondary={note.category} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => deleteNote(note._id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton
                                            edge="end"
                                            aria-label="open"
                                            onClick={() => handleNoteClick(note._id)}
                                        >
                                            <KeyboardArrowRightIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="h5">No results found.</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

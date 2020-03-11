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
    const [currentNote, setCurrentNote] = useState(null);

    useEffect(() => {
        loadNotes();
        if (currentNote) {
            console.log("need to send the note to the text editor");
        }
    });

    useEffect(() => {
        console.log(currentNote);
    }, [currentNote]);

    function loadNotes() {
        API.getNotes("johnsmith")
            .then(res => setNotes(res))
            .catch(err => console.log(err));
    }

    const handleNoteClick = event => {
        const noteid = event.target.getAttribute("noteid"); //THIS IS A MOCK UP!
        console.log(noteid);
        setCurrentNote(notes[noteid]); //THIS WILL CHANGE
    };

    function deleteNote(id) {
        // API.deleteNote(id)
        //     .then(res => loadNotes())
        //     .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value });
    }

    // When the form is submitted, use the API.saveNote method to save the Note data
    // Then reload notes from the database
    function handleFormSubmit(event) {
        // event.preventDefault();
        // if (formObject.title && formObject.author) {
        //     API.saveNote({
        //         noteName: formObject.noteName,
        //         Type: formObject.Type,
        //         Description: formObject.Description
        //     })
        //         .then(() =>
        //             setFormObject({
        //                 noteName: "",
        //                 Type: "",
        //                 Description: ""
        //             })
        //         )
        //         .then(() => loadNotes())
        //         .catch(err => console.log(err));
        // }
    }

    return (
        <Container>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h3">Create/Delete Notes</Typography>

                    <form>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField id="title" label="Title" fullWidth required />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField id="type" label="Category" fullWidth required />{" "}
                            </Grid>
                        </Grid>

                        <Grid container className={classes.editorWrapper}>
                            <Grid item xs={12}>
                                <TextEditor />
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
                                <ListItem key={index} button noteid={index} onClick={handleNoteClick}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={note.title} secondary={note.category.category} />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="h5">No results found.</Typography>
                    )}

                    {notes.length ? (
                        // <List>
                        <>
                            {notes.map(note => {
                                return (
                                    <ListItem key={note._id}>
                                        {/*<a href={"/notes/" + note._id}>*/}
                                        {/*    <strong>*/}
                                        {/*        {note.title} by {note.username}*/}
                                        {/*    </strong>*/}
                                        {/*</a>*/}
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <div className={classes.demo}>
                                                    <List>
                                                        <ListItem>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                    <FolderIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={note.title}
                                                                secondary={note.category.category}
                                                            />
                                                            <ListItemSecondaryAction>
                                                                <IconButton edge="end" aria-label="delete">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </ListItemSecondaryAction>
                                                        </ListItem>
                                                    </List>
                                                </div>
                                            </Grid>
                                        </Grid>

                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Delete
                                        </Button>
                                    </ListItem>
                                );
                            })}
                        </>
                    ) : (
                        <h3>No Results to Display</h3>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

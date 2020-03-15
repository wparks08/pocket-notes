import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NoteTable from "../../components/NoteTable";
import { useParams } from "react-router-dom";
import API from "../../utils/API";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        marginBottom: theme.spacing(1)
    }
}));

function Notes() {
<<<<<<< HEAD
    //Setting our component's initial state
=======
>>>>>>> c0fb0961e2416a969e629eec3453b93923371b7e
    const classes = useStyles();
    const { categoryID } = useParams();
    const [categoryName, setCategoryName] = useState("");

<<<<<<< HEAD
    // useEffect(() => {
    //     loadNotes();
    // }, []);

    function generate(element) {
        return [0, 1, 2].map(value =>
            React.cloneElement(element, {
                key: value
            })
        );
    }

    // function loadNotes() {
    //     API.getNotes()
    //         .then(res => setNotes(res.data))
    //         .catch(err => console.log(err));
    // }

    // function deleteNote(id) {
    //     API.deleteNote(id)
    //         .then(res => loadNotes())
    //         .catch(err => console.log(err));
    // }

    // Handles updating component state when the user types into the input field
    // function handleInputChange(event) {
    //     const { name, value } = event.target;
    //     setFormObject({ ...formObject, [name]: value });
    // }

    // When the form is submitted, use the API.saveNote method to save the Note data
    // Then reload notes from the database
    // function handleFormSubmit(event) {
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
    //}

    return (
        <Container fluid>
            <Grid container>
                <Grid item md={12}>
                    <Typography variant="h3">Create/Delete Notes</Typography>

                    <form>
                        <Grid container>
                            <Grid item>
                                <TextField id="title" label="Title Required" />
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item>
                                <TextField id="type" label="Type" />{" "}
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item>
                                <TextField
                                    id="filled-multiline-static"
                                    label="Multiline"
                                    multiline
                                    rows="4"
                                    defaultValue="Default Value"
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>

                        <Grid container>
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
                            {notes.map(note => {
                                return (
                                    <ListItem key={note._id}>
                                        <a href={"/notes/" + note._id}>
                                            <strong>
                                                {note.noteName} by {note.Type}
                                            </strong>
                                        </a>
                                        <Grid container>
                                            <Grid item xs={12} md={6}>
                                                <Typography variant="h6" className={classes.title}>
                                                    Avatar with text and icon
                                                </Typography>
                                                <div className={classes.demo}>
                                                    <List>
                                                        {generate(
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <FolderIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText
                                                                    primary="Single-line item"
                                                                    secondary={secondary ? "Secondary text" : null}
                                                                />
                                                                <ListItemSecondaryAction>
                                                                    <IconButton edge="end" aria-label="delete">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </ListItemSecondaryAction>
                                                            </ListItem>
                                                        )}
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
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
=======
    useEffect(() => {
        API.getCategory(categoryID)
            .then(result => setCategoryName(result.data.category))
            .catch(err => console.log(err));
    }, [categoryID]);

    return (
        <Container>
            {categoryID ? (
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/categories">Categories</Link>
                    <Typography color="textPrimary">{categoryName}</Typography>
                </Breadcrumbs>
            ) : (
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Notes</Typography>
                </Breadcrumbs>
            )}

            <Grid container item justify="flex-end">
                <Button variant="contained" component={Link} to="/notes/new" color="primary" className={classes.button}>
                    New Note
                </Button>
            </Grid>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <NoteTable />
>>>>>>> c0fb0961e2416a969e629eec3453b93923371b7e
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

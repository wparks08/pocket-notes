import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import NoteTable from "../../components/NoteTable";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        marginBottom: theme.spacing(1)
    }
}));

function Notes() {
    const classes = useStyles();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = () => {
        API.getNotes("johnsmith")
            .then(response => setNotes(response.data))
            .catch(err => console.log(err));
    };

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Notes</Typography>
            </Breadcrumbs>
            <Grid container item justify="flex-end">
                <Button variant="contained" component={Link} to="/notes/new" color="primary" className={classes.button}>
                    New Note
                </Button>
            </Grid>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <NoteTable notes={notes} loadNotes={loadNotes} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

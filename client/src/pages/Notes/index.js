import React, { useEffect, useState } from "react";
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
    //Setting our component's initial state
    const classes = useStyles();
    const { categoryID } = useParams();
    const [categoryName, setCategoryName] = useState("");

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
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTable from "../../components/CategoryTable";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import NewCategoryDialog from "../../components/NewCategoryDialog";

const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: theme.spacing(1)
    }
}));

function Categories() {
    const classes = useStyles();
    const [reload, setReload] = useState(false);
    const [newCategoryOpen, setNewCategoryOpen] = useState(false);

    const handleClickOpen = () => {
        setNewCategoryOpen(true);
    };

    const handleClose = () => {
        setNewCategoryOpen(false);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const category = event.target.category.value;
        API.saveCategory({ category, username: "johnsmith" })
            .then(() => {
                setReload(true);
                handleClose();
            })
            .catch(err => console.log(err));
    };

    return (
        <Container>
            <NewCategoryDialog onClose={handleClose} open={newCategoryOpen} onSubmit={handleSubmit} />
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Categories</Typography>
            </Breadcrumbs>
            <Grid container item justify="flex-end">
                <Button variant="contained" color="primary" className={classes.button} onClick={handleClickOpen}>
                    New Category
                </Button>
            </Grid>
            <CategoryTable reload={reload} setReload={setReload} />
        </Container>
    );
}

export default Categories;

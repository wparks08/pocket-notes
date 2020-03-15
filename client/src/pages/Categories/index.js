import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CategoryTable from "../../components/CategoryTable";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    button: {
        marginBottom: theme.spacing(1)
    }
}))

function Categories() {
    const classes = useStyles();

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Categories</Typography>
            </Breadcrumbs>
            <Grid container item justify="flex-end">
                <Button variant="contained" color="primary" className={classes.button}>
                    New Category
                </Button>
            </Grid>
            <CategoryTable />
        </Container>
    );
}

export default Categories;

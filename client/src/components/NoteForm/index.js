import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextEditor from "../TextEditor";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    }
}));

function NoteForm(props) {
    const classes = useStyles();
    const { note, handleChange, handleFormSubmit, setNote } = props;
    const { title, category } = note;

    return (
        <Grid container className={classes.wrapper}>
            <Grid item md={12}>
                <form>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                fullWidth
                                required
                                value={title}
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
                                value={category}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>

                    <Grid container className={classes.wrapper}>
                        <Grid item xs={12}>
                            <TextEditor setCurrentNote={setNote} currentNote={note} />
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
        </Grid>
    );
}

NoteForm.propTypes = {
    note: PropTypes.object,
    handleChange: PropTypes.func,
    handleFormSubmit: PropTypes.func,
    setNote: PropTypes.func,
    title: PropTypes.string,
    category: PropTypes.string
};

export default NoteForm;

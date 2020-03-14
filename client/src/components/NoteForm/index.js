import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import TextEditor from "../TextEditor";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import { CircularProgress } from "@material-ui/core";
import CategoryAutocomplete from "../CategoryAutocomplete";
import API from "../../utils/API";

const useStyles = makeStyles(theme => ({
    wrapper: {
        marginTop: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1)
    },
    progressWrapper: {
        margin: theme.spacing(1),
        position: "relative"
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12
    },
    fullWidth: {
        width: "100%"
    }
}));

function NoteForm(props) {
    const classes = useStyles();
    const { note, handleChange, handleFormSubmit, setNote, saving, handleCategoryChange } = props;
    const { title } = note;
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({ category: "" });

    useEffect(() => {
        loadCategories();
    }, [note]);

    const loadCategories = () => {
        API.getCategories("johnsmith")
            .then(result => {
                setCategories(result.data);
                if (note.categoryID) {
                    setCategory(categories.find(category => category._id === note.categoryID));
                }
            })
            .catch(err => console.log(err));
    };

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
                            <CategoryAutocomplete
                                categories={categories}
                                loadCategories={loadCategories}
                                handleCategoryChange={handleCategoryChange}
                                initialValue={category}
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
                            <div className={classes.progressWrapper}>
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
                                {saving && <CircularProgress size={24} className={classes.buttonProgress} />}
                            </div>
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
    category: PropTypes.string,
    saving: PropTypes.bool
};

export default NoteForm;

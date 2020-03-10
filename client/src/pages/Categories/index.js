import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

function Categories() {
    const classes = useStyles();
    return (
        <Container>
            <Typography variant="h3">Note List</Typography>
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-native-select">Categories</InputLabel>
                    <Select native defaultValue="" input={<Input id="grouped-native-select" />}>
                        <option value="" />
                        <optgroup label="Appointments">
                            <option value={1}>Option 1</option>
                        </optgroup>
                        <optgroup label="Shows">
                            <option value={3}>Option 3</option>
                        </optgroup>
                        <optgroup label="To-Do">
                            <option value={3}>Option 3</option>
                        </optgroup>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="grouped-select">All</InputLabel>
                    <Select defaultValue="" input={<Input id="grouped-select" />}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <ListSubheader>All Notes</ListSubheader>
                    </Select>
                </FormControl>
            </div>
        </Container>
    );
}

export default Categories;

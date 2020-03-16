import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    actionButton: {
        marginTop: -5,
        marginBottom: -5
    }
}));

function NoteRow(props) {
    const classes = useStyles();
    const { handleDelete, note } = props;

    return (
        <TableRow hover tabIndex={-1}>
            <TableCell component="th" scope="row">
                {note.title}
            </TableCell>
            <TableCell align="left">{note.category}</TableCell>
            <TableCell align="left">
                {new Date(note.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour12: true,
                    hour: "numeric",
                    minute: "numeric"
                })}
            </TableCell>
            <TableCell align="right">
                <IconButton size="small" className={classes.actionButton} onClick={() => handleDelete(note._id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton size="small" className={classes.actionButton} component={Link} to={`/notes/${note._id}`}>
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

NoteRow.propTypes = {
    note: PropTypes.any,
    handleDelete: PropTypes.func
};

export default NoteRow;

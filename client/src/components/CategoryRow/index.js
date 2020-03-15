import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import * as PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    actionButton: {
        marginTop: -5,
        marginBottom: -5
    }
}));

function CategoryRow(props) {
    const classes = useStyles();
    const { handleDelete, category } = props;

    return (
        <TableRow hover tabIndex={-1}>
            <TableCell align="left">{category.category}</TableCell>
            <TableCell align="right">
                <IconButton size="small" className={classes.actionButton} onClick={() => handleDelete(category._id)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton size="small" className={classes.actionButton} component={Link} to={`/categories/${category._id}`}>
                    <SearchIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

CategoryRow.propTypes = {
    category: PropTypes.any,
    handleDelete: PropTypes.func
};

export default CategoryRow;

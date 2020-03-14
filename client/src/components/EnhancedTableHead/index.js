import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const headCells = [
    { id: "title", numeric: false, label: "Title" },
    { id: "category", numeric: false, label: "Category" },
    { id: "date", numeric: false, label: "Date Entered" },
    { id: "actions", numeric: true, label: "Actions" }
];

const useStyles = makeStyles(theme => ({
    visuallyHidden: {
        border: 0,
        clip: "rect(0 0 0 0)",
        height: 1,
        margin: -1,
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        top: 20,
        width: 1
    }
}));

function EnhancedTableHead(props) {
    const classes = useStyles();
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding="default"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.id !== "actions" ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onRequestSort: PropTypes.func
};

export default EnhancedTableHead;

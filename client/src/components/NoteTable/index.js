import Paper from "@material-ui/core/Paper";
import { TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import EnhancedTableHead from "../EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody";
import { getComparator, stableSort } from "../../utils/sorting";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import * as PropTypes from "prop-types";
import React, { useState } from "react";
import NoteRow from "../NoteRow";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    }
}));

function NoteTable(props) {
    const classes = useStyles();
    const { notes, loadNotes } = props;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("date");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleDelete = id => {
        API.deleteNote(id)
            .then(() => {
                loadNotes();
            })
            .catch(err => console.log(err));
    };

    const displayNoteRow = note => {
        return <NoteRow key={note._id} note={note} handleDelete={handleDelete} />;
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, notes.length - page * rowsPerPage);

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                        {stableSort(notes, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(displayNoteRow)}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={notes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

NoteTable.propTypes = {
    notes: PropTypes.array,
    loadNotes: PropTypes.func
};

export default NoteTable;

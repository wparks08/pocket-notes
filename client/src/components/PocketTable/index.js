import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import EnhancedTableHead from "../EnhancedTableHead";
import TableBody from "@material-ui/core/TableBody";
import { getComparator, stableSort } from "../../utils/sorting";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    }
}));

function PocketTable(props) {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState(props.order || "desc");
    const [orderBy, setOrderBy] = useState(props.orderBy || "");

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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.items.length - page * rowsPerPage);

    return (
        <Paper className={classes.paper}>
            <TableContainer>
                <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
                    <EnhancedTableHead
                        headers={props.headers}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {stableSort(props.items, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(props.displayRow)}
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
                count={props.items.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

PocketTable.propTypes = {
    items: PropTypes.array,
    headers: PropTypes.array,
    displayRow: PropTypes.func,
    orderBy: PropTypes.string,
    order: PropTypes.string
};

export default PocketTable;

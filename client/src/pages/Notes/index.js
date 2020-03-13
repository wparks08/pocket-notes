import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/API";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { TableContainer } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: "title", numeric: false, label: "Title" },
    { id: "category", numeric: false, label: "Category" },
    { id: "date", numeric: false, label: "Date Entered" },
    { id: "actions", numeric: true, label: "Actions" }
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    paper: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 750
    },
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
    },
    actionButton: {
        marginTop: -5,
        marginBottom: -5
    },
    button: {
        marginBottom: theme.spacing(1)
    }
}));

function Notes() {
    const classes = useStyles();

    const [notes, setNotes] = useState([]);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("date");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        API.getNotes("johnsmith")
            .then(response => setNotes(response.data))
            .catch(err => console.log(err));
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, notes.length - page * rowsPerPage);

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="textPrimary">Notes</Typography>
            </Breadcrumbs>
            <Grid container item justify="flex-end">
                <Button variant="contained" component={Link} to="/notes/new" color="primary" className={classes.button}>
                    New Note
                </Button>
            </Grid>
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TableContainer>
                            <Table className={classes.table} aria-labelledby="tableTitle" size="medium">
                                <EnhancedTableHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {stableSort(notes, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(note => {
                                            return (
                                                <TableRow hover tabIndex={-1}>
                                                    <TableCell component="th" scope="row">
                                                        {note.title}
                                                    </TableCell>
                                                    <TableCell align="left">{note.category}</TableCell>
                                                    <TableCell align="left">{note.date}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton size="small" className={classes.actionButton}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                        <IconButton size="small" className={classes.actionButton} component={Link} to={`/notes/${note._id}`}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
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
                </Grid>
            </Grid>
        </Container>
    );
}

export default Notes;

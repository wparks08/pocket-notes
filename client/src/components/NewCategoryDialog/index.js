import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

function NewCategoryDialog({ onSubmit, open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>New Category</DialogTitle>
            <DialogContent>
                <DialogContentText>Enter a new category below.</DialogContentText>
                <form onSubmit={onSubmit}>
                    <TextField autoFocus margin="dense" id="category" name="category" label="Category Name" fullWidth />
                    <DialogActions>
                        <Button onClick={onClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

NewCategoryDialog.propTypes = {
    onSubmit: PropTypes.func,
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default NewCategoryDialog;

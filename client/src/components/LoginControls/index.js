import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import NoteIcon from "@material-ui/icons/Note";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";

function LoginControls(props) {
    let isAuthenticated = true;
    return (
        isAuthenticated ?
            <ListItem button component={Link} to="/registerUser" onClick={props.handleDrawerToggle}>
                <ListItemIcon>
                    <NoteIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
            </ListItem>
            : ""
    );
}
export default LoginControls;
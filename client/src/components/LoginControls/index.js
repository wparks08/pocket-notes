import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";

function LoginControls(props) {
    return (
        <ListItem button component={Link} to="/registerUser" onClick={props.handleDrawerToggle}>
            <ListItemIcon>
                <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
        </ListItem>
        <ListItem button component={Link} to="/loginUser" onClick={props.handleDrawerToggle}>
            <ListItemIcon>
                <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
        </ListItem>

    );
}
export default LoginControls;
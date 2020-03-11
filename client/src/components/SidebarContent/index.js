import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/List";
import NoteIcon from "@material-ui/icons/Note";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoginControls from "./LoginControls";

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));

function SidebarContent(props) {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button component={Link} to="/" onClick={props.handleDrawerToggle}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/categories" onClick={props.handleDrawerToggle}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
                <ListItem button component={Link} to="/notes" onClick={props.handleDrawerToggle}>
                    <ListItemIcon>
                        <NoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notes" />
                </ListItem>
                <LoginControls />
            </List>
        </div>
    );
}

SidebarContent.propTypes = {
    handleDrawerToggle: PropTypes.func
};

export default SidebarContent;

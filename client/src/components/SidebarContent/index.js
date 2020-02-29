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

const useStyles = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar
}));

function SidebarContent() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <NoteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notes" />
                </ListItem>
            </List>
        </div>
    );
}

export default SidebarContent;
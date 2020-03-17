import React, { useState } from "react";
import Topbar from "../Topbar";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../../config";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function Layout(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <Topbar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} onLogout={props.onLogout} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
            {props.children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.any
};

export default Layout;

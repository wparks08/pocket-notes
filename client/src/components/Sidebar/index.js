import React from "react";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useTheme from "@material-ui/core/styles/useTheme";
import SidebarContent from "../SidebarContent";
import { drawerWidth } from "../../config";

const useStyles = makeStyles(theme => ({
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth
    }
}));

function Sidebar(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
                <Drawer
                    container={props.container}
                    variant="temporary"
                    anchor={theme.direction === "rtl" ? "right" : "left"}
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{ keepMounted: true }}
                >
                    <SidebarContent handleDrawerToggle={props.handleDrawerToggle} />
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                    <SidebarContent />
                </Drawer>
            </Hidden>
        </nav>
    );
}

Sidebar.propTypes = {
    container: PropTypes.any,
    mobileOpen: PropTypes.bool,
    handleDrawerToggle: PropTypes.func
};

export default Sidebar;

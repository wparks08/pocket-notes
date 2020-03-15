<<<<<<< HEAD
import React, { useState, Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
=======
import React, { useState } from "react";
>>>>>>> c0fb0961e2416a969e629eec3453b93923371b7e
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Menu } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import LoginControls from "../LoginControls";

function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleMenu} color="inherit">
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <Divider />
                <LoginControls />
            </Menu>
        </>
    );
}

export default UserMenu;

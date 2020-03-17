import React, { Component } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class LoginControls extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        console.log("logging out");
    };
    render() {
        const { isAuthenticated } = this.props.auth;
        console.log(isAuthenticated);
        return (
            isAuthenticated === true ? (
                <List>
                    <ListItem button onClick={this.onLogoutClick}>
                        <ListItemIcon>
                            <VpnKeyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </ List>
            ) : (
                    <List>
                        <ListItem button component={Link} to="/registerUser">
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItem>
                        <ListItem button component={Link} to="/loginUser">
                            <ListItemIcon>
                                <VpnKeyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItem>
                    </List>
                )

        );
    }
}
LoginControls.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(LoginControls);

import React, { Component } from "react";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logoutUser from "../../actions/authActions";

class LoginControls extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/home");
    };
    render() {
        const { user } = this.props.auth;
        return (
            <List>
                <ListItem button component={Link} to="/registerUser" onClick={this.props.handleDrawerToggle}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                </ListItem>
                <ListItem button component={Link} to="/loginUser" onClick={this.props.handleDrawerToggle}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={this.props.onLogoutClick()}>
                    <ListItemIcon>
                        <VpnKeyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
            </List >
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

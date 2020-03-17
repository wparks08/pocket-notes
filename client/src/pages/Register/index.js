import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            password2: "",
            error: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { error } = this.state;
        return (
            <Container maxWidth="xl" style={{ display: "flex", height: "100vh", backgroundColor: "#3f51b5" }}>
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6} lg={4}>
                        <Paper>
                            <form style={{ padding: 40 }} onSubmit={this.onSubmit}>
                                <Grid container justify="center">
                                    <Grid item>
                                        <Typography variant="h4" color="textSecondary">
                                            Register
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            id="firstName"
                                            name="firstName"
                                            label="First Name"
                                            error={error.firstName}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            onChange={this.onChange}
                                            value={this.state.firstName}
                                            autoComplete="given-name"
                                        />
                                        <TextField
                                            id="lastName"
                                            name="lastName"
                                            label="Last Name"
                                            error={error.lastName}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            onChange={this.onChange}
                                            value={this.state.lastName}
                                            autoComplete="family-name"
                                        />
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email Address"
                                            error={error.email}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            type="email"
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            autoComplete="email"
                                        />
                                        <TextField
                                            id="password"
                                            name="password"
                                            label="Password"
                                            error={error.password}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            autoComplete="new-password"
                                        />
                                        <TextField
                                            id="password2"
                                            name="password2"
                                            label="Confirm Password"
                                            error={error.password2}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            type="password"
                                            onChange={this.onChange}
                                            value={this.state.password2}
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                    <Grid item container xs={12} justify="center">
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginBottom: 8, marginTop: 8 }}
                                                type="submit"
                                            >
                                                Sign Up
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

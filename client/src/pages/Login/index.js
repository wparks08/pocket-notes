import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: {}
        };
    }
    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        console.log(this.props);
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const sensitiveData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(sensitiveData);
        this.props.loginUser(sensitiveData, this.props.history, this.props.onAuthenticated);
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
                                            Sign In
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            error={error.email}
                                            fullWidth
                                            style={{ marginBottom: 16 }}
                                            onChange={this.onChange}
                                            value={this.state.email}
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
                                                Login
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item container xs={12} justify="center">
                                        <Grid item xs={12}>
                                            <Typography align="center" variant="subtitle2">
                                                Not registered yet? Click here:
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="contained" color="primary" component={Link} to="/register" style={{ marginBottom: 8, marginTop: 8 }}>
                                                Register
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
                {/*<p className="">*/}
                {/*    Don't have an account? <Link to="/register">Register</Link>*/}
                {/*</p>*/}
                {/*<form noValidate onSubmit={this.onSubmit}>*/}
                {/*    <div className="">*/}
                {/*        <input*/}
                {/*            onChange={this.onChange}*/}
                {/*            value={this.state.email}*/}
                {/*            error={error.email}*/}
                {/*            id="email"*/}
                {/*            name="email"*/}
                {/*            type="email"*/}
                {/*        />*/}
                {/*        <label htmlFor="email">email</label>*/}
                {/*    </div>*/}
                {/*    <div className="">*/}
                {/*        <input*/}
                {/*            onChange={this.onChange}*/}
                {/*            value={this.state.password}*/}
                {/*            error={error.password}*/}
                {/*            id="password"*/}
                {/*            type="password"*/}
                {/*        />*/}
                {/*        <label htmlFor="password">Password</label>*/}
                {/*    </div>*/}
                {/*    <div className="" style={{ paddingLeft: "11.250px" }}>*/}
                {/*        <button*/}
                {/*            style={{*/}
                {/*                width: "150px",*/}
                {/*                borderRadius: "3px",*/}
                {/*                letterSpacing: "1.5px",*/}
                {/*                marginTop: "1rem"*/}
                {/*            }}*/}
                {/*            type="submit"*/}
                {/*            className=""*/}
                {/*        >*/}
                {/*            Login*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</form>*/}
            </Container>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));

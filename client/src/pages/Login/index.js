import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: {}
        };
    }
    // componentDidUpdate(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //         this.props.history.push("/home");
    //     }
    //     if (nextProps.error) {
    //         this.setState({
    //             error: nextProps.error
    //         });
    //     }
    // }

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
        this.props.loginUser(sensitiveData);
    };
    render() {
        const { error } = this.state;
        return (
            <Container>
                <Typography variant="h3">Log in</Typography>
                <div className="container">
                    <p className="">
                        Don&apos;t have an account? <Link to="/registerUser">Please Register</Link>
                    </p>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={error.email}
                                id="email"
                                name="email"
                                type="email"
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <br></br>
                        <div className="">
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={error.password}
                                id="password"
                                type="password"
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="" style={{ paddingLeft: "11.250px" }}>
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className=""
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
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

export default connect(mapStateToProps, { loginUser })(Login);

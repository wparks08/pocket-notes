import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: {}
        };
    }
    componentDidUpdate(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
        if (nextProps.error) {
            this.setState({
                error: nextProps.error
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const sensitiveData = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(sensitiveData);
        this.props.loginUser(sensitiveData);
    };
    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <p className="">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                    <div className="">
                        <input
                            onChange={this.onChange}
                            value={this.state.username}
                            error={error.username}
                            id="username"
                            type="username"
                        />
                        <label htmlFor="Username">Username</label>
                    </div>
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
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);


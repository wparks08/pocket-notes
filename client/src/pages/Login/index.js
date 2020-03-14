import React from "react";
import { Link } from "react-router-dom";
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { withRouter } from "react-router-dom";

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
        this.props.loginUser(sensitiveData, this.props.history);
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
                            value={this.state.email}
                            error={error.email}
                            id="email"
                            name="email"
                            type="email"
                        />
                        <label htmlFor="email">email</label>
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
)(withRouter(Login));

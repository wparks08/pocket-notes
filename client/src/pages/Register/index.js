import React from "react";
import { Link } from "react-router-dom";

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
            errors: {}
        };
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
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };
    };
    render() {
        return (
            <form noValidate onSubmit={this.onSubmit} >
                <div className="input-field ">
                    <input
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.name}
                        id="name"
                        type="text"
                    />
                    <label htmlFor="name"> First Name</label>
                </div>
                <div className="input-field ">
                    <input
                        onChange={this.onChange}
                        value={this.state.lastName}
                        error={error.name}
                        id="lastName"
                        type="text"
                    />
                    <label htmlFor="name"> Last Name</label>
                </div>
                <div className="input-field ">
                    <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="input-field ">
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="input-field ">
                    <input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                    />
                    <label htmlFor="password2">Confirm Password</label>
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
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Sign up
                        </button>
                </div>
            </form>
        );
    }
}
export default Register;

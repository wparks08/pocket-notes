import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.primary.dark
    },
    form: {
        padding: theme.spacing(5)
    },
    textField: {
        marginBottom: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(1, 0)
    }
}));

function Login() {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleInputChange = event => {
        const { name, value } = event.target;

        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <Container className={classes.root} maxWidth="xl">
            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} md={6} lg={4}>
                    <Paper>
                        <form className={classes.form}>
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
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        className={classes.textField}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        fullWidth
                                        className={classes.textField}
                                        type="password"
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item container xs={12} justify="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
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
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            Register
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

export default Login;

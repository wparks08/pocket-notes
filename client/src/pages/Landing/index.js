import React from "react";
import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import heroBg from "../../assets/images/landingbg.jpg";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles(theme => ({
    herobg: {
        backgroundImage: "url(" + heroBg + ")",
        height: 540,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: 0
    },
    heroOverlay: {
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,.4)"
    },
    heroText: {
        color: "#fff"
    },
    toolbar: theme.mixins.toolbar,
    transparentBackground: {
        background: "rgba(0,0,0,.6)"
    },
    spacer: {
        flexGrow: 1,
        content: " "
    },
    topbarBtn: {
        color: "#fff",
        margin: theme.spacing(0, 1, 0, 1)
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    sidekick: {
        minHeight: "360px"
    }
}));

function Landing() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.herobg}>
            <AppBar className={(classes.toolbar, classes.transparentBackground)}>
                <Toolbar>
                    <Box className={classes.spacer}>&nbsp;</Box>
                    <Button className={classes.topbarBtn}>Sign Up</Button>
                    <Button className={classes.topbarBtn}>Log In</Button>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.heroOverlay} justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="h1" className={classes.heroText}>
                        Pocket Notes
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.sidekick}>
                <Grid item md={6} className={classes.flexCenter}>
                    <Typography variant="h3">Notes. In your pocket.</Typography>
                </Grid>
                <Grid item md={6} className={classes.flexCenter}>
                    <Typography>Here is the app that makes it happen.</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Landing;

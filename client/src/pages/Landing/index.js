import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import heroBg from "../../assets/images/landingbg.jpg";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import CreateIcon from "@material-ui/icons/Create";
import CloudIcon from "@material-ui/icons/Cloud";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Divider from "@material-ui/core/Divider";

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
        height: "400px",
        backgroundColor: "#eee"
    },
    showcaseCard: {
        width: 300,
        height: 300,
        textAlign: "center"
    },
    showcaseIcon: {
        color: "rgba(255,255,255,0.90)",
        backgroundColor: "#002984",
        padding: theme.spacing(1),
        borderRadius: "50%",
        marginTop: theme.spacing(2)
    },
    showcaseDivider: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }
}));

function Landing() {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classes.herobg}>
            <AppBar className={(classes.toolbar, classes.transparentBackground)}>
                <Toolbar>
                    <Box className={classes.spacer}>&nbsp;</Box>
                    <Button component={Link} to="/register" className={classes.topbarBtn}>
                        Sign Up
                    </Button>
                    <Button component={Link} to="/login" className={classes.topbarBtn}>
                        Log In
                    </Button>
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
                <Grid item md={4} className={classes.flexCenter}>
                    <Card className={classes.showcaseCard}>
                        <CardContent>
                            <CreateIcon fontSize="large" className={classes.showcaseIcon} />
                            <Divider className={classes.showcaseDivider} />
                            <Typography gutterBottom>Write anything. Anywhere. Anytime.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} className={classes.flexCenter}>
                    <Card className={classes.showcaseCard}>
                        <CardContent>
                            <CloudIcon fontSize="large" className={classes.showcaseIcon} />
                            <Divider className={classes.showcaseDivider} />
                            <Typography gutterBottom>
                                Keep your notes safe in the cloud, and access them when you need them.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} className={classes.flexCenter}>
                    <Card className={classes.showcaseCard}>
                        <CardContent>
                            <ScheduleIcon fontSize="large" className={classes.showcaseIcon} />
                            <Divider className={classes.showcaseDivider} />
                            <Typography gutterBottom>Ready when you are. Just log in, and start writing.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Landing;

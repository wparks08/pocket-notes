import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function Home() {
    return (
        <Container>
            <Typography variant="h3">Welcome to Pocket Notes</Typography>
            <p>Pocket Notes is a mobile app that allows users to enter notes into a database for future reference.</p>
            <p>Upon registration/sign in, they are given the option to create a new or select a previous category.</p>
            <p>
                Once having selected their category, they can add a note which records a datestamp, their username, the
                category and the body of their note. Users only have access to their own notes.
            </p>
            <p>The utility of this app can range from simple to-do lists to activity tracking, diet, exercise, etc.</p>
        </Container>
    );
}

export default Home;

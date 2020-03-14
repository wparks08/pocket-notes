import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

function Categories() {
    return (
        <Container>
            <Typography variant="h3">Categories</Typography>
            <br></br>
            <select className="category">
                <option value="">Select your category</option>
                <option value="">Diary</option>
                <option value="">List</option>
                <option value="">Note</option>
                <option value="">ToDo</option>
            </select>
        </Container>
    );
}

export default Categories;

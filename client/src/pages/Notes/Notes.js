import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

function Notes() {
    // Setting our component's initial state
    const [notes, setNotes] = useState([])
    const [formObject, setFormObject] = useState({
        noteName: "",
        Type: "",
        Description: ""
    })

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        API.getNotes()
            .then(res =>
                setNotes(res.data)
            )
            .catch(err => console.log(err));
    };


    function deleteNote(id) {
        API.deleteNote(id)
            .then(res => loadNotes())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveNote method to save the Note data
    // Then reload notes from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveNote({

                noteName: formObject.noteName,
                Type: formObject.Type,
                Description: formObject.Description

            })
                .then(() => setFormObject({

                    noteName: "",
                    Type: "",
                    Description: ""

                }))
                .then(() => loadNotes())
                .catch(err => console.log(err));
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-6">
                    <Jumbotron>
                        <h1>Create or Delete Notes</h1>
                    </Jumbotron>
                    <form>
                        <Input
                            onChange={handleInputChange}
                            name="noteName"
                            placeholder="Title (required)"
                            value={formObject.title}
                        />
                        <Input
                            onChange={handleInputChange}
                            name="Type"
                            placeholder="Type of note (required)"
                            value={formObject.author}
                        />
                        <TextArea
                            onChange={handleInputChange}
                            name="Description"
                            placeholder=" type ur description"
                            value={formObject.synopsis}
                        />
                        <FormBtn
                            disabled={!(formObject.author && formObject.title)}
                            onClick={handleFormSubmit}
                        >
                            Submit Note
              </FormBtn>
                    </form>
                </Col>
                <Col size="md-6 sm-12">
                    <Jumbotron>
                        <h1>List of Notes</h1>
                    </Jumbotron>
                    {notes.length ? (
                        <List>
                            {notes.map(book => {
                                return (
                                    <ListItem key={note._id}>
                                        <a href={"/notes/" + book._id}>
                                            <strong>
                                                {note.noteName} by {note.Type}
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => deleteNote(note._id)} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                            <h3>No Results to Display</h3>
                        )}
                </Col>
            </Row>
        </Container>
    );
}


export default Notes;

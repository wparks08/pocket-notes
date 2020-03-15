import React, { useEffect, useState } from "react";
import NoteRow from "../NoteRow";
import API from "../../utils/API";
import PocketTable from "../PocketTable";
import { useParams } from "react-router-dom";

function NoteTable() {
    const [notes, setNotes] = useState([]);

    const { categoryID } = useParams();

    const headCells = [
        { id: "title", numeric: false, label: "Title" },
        { id: "category", numeric: false, label: "Category" },
        { id: "date", numeric: false, label: "Date Entered" },
        { id: "actions", numeric: true, label: "Actions" }
    ];

    useEffect(() => {
        const loadNotes = () => {
            const getNotes = categoryID ? API.getNotesByCategory("johnsmith", categoryID) : API.getNotes("johnsmith");
            getNotes
                .then(response => {
                    let notes = response.data;
                    API.getCategories("johnsmith").then(response => {
                        let categories = response.data;
                        setNotes(populateCategories(notes, categories));
                    });
                })
                .catch(err => console.log(err));
        };

        loadNotes();
    }, []);

    const populateCategories = (noteArray, categoryArray) => {
        return noteArray.map(note => {
            note.category = categoryArray.find(category => category._id === note.categoryID)?.category;
            return note;
        });
    };

    const handleDelete = id => {
        API.deleteNote(id)
            .then(() => {
                loadNotes();
            })
            .catch(err => console.log(err));
    };

    const loadNotes = () => {
        API.getNotes("johnsmith")
            .then(response => {
                let notes = response.data;
                API.getCategories("johnsmith").then(response => {
                    let categories = response.data;
                    setNotes(populateCategories(notes, categories));
                });
            })
            .catch(err => console.log(err));
    };

    const displayNoteRow = note => {
        return <NoteRow key={note._id} note={note} handleDelete={handleDelete} />;
    };

    return <PocketTable displayRow={displayNoteRow} headers={headCells} items={notes} orderBy="date" order="desc" />;
}

export default NoteTable;

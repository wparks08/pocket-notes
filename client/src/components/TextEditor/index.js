import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

function TextEditor(props) {
    const { currentNote } = props;

    const handleEditorChange = content => {
        props.setCurrentNote({ ...currentNote, body: content });
    };

    return (
        <Editor
            value={currentNote.body}
            init={{
                height: 500,
                menubar: false,
                plugins: ["lists"],
                toolbar:
                    "undo redo | bold italic underline backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
            }}
            onEditorChange={handleEditorChange}
            {...props}
        />
    );
}

TextEditor.propTypes = {
    currentNote: PropTypes.object,
    setCurrentNote: PropTypes.func
};

export default TextEditor;

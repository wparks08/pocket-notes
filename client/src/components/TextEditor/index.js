import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

function TextEditor(props) {
    //will probably need to lift this state to a parent component later
    const [text, setText] = useState(props.text || "");

    //This will probably need to get lifted as well.
    // -- `content` holds all of the user-input content of the text editor. This will be the value we're looking for when saving the note to the db --
    const handleEditorChange = content => {
        setText(content);
    };

    return (
        <Editor
            initialValue={text}
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
    text: PropTypes.string
};

export default TextEditor;

const axios = require("axios");

export default {
    getNotes: username => {
        return axios.get("/api/notes", { username: username });
    },

    saveNote: note => {
        note.username = "johnsmith";
        return axios.post("/api/notes", note);
    },

    updateNote: note => {
        return axios.put(`/api/notes/${note._id}`, note);
    },

    deleteNote: id => {
        return axios.delete(`/api/notes/${id}`);
    },

    getCategories: username => {
        // return new Promise((resolve, reject) => {
        //     try {
        //         const result = mockCategories.filter(category => category.username === username);
        //         resolve(result);
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
    },

    getNotesByCategory: (username, category) => {
        // return new Promise((resolve, reject) => {
        //     try {
        //         const result = mockNotes.filter(note => note.username === username && note.category === category);
        //         resolve(result);
        //     } catch (error) {
        //         reject(error);
        //     }
        // });
    }
};

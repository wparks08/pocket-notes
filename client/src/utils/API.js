const axios = require("axios");

export default {
    getNotes: username => {
        return axios.get("/api/notes", { params: { username: username } });
    },

    getNote: id => {
        return axios.get(`/api/notes/${id}`);
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
        return axios.get("/api/categories", { params: { username: username } });
    },

    getCategory: id => {
        return axios.get(`/api/categories/${id}`);
    },

    saveCategory: category => {
        return axios.post("/api/categories", category);
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

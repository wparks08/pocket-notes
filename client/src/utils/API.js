import store from "../store";
const axios = require("axios");
const username = store.getState().auth.user.email;

export default {
    getNotes: username => {
        return axios.get("/api/notes", { params: { username: username } });
    },

    getNote: id => {
        return axios.get(`/api/notes/${id}`);
    },

    saveNote: note => {
        note.username = username;
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

    deleteCategory: id => {
        return axios.delete(`/api/categories/${id}`);
    },

    getNotesByCategory: (username, categoryID) => {
        return axios.get("/api/notes", { params: { username, categoryID } });
    }
};

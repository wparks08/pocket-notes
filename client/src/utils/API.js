/**********************/
/* *   Mock Data    * */
/*********************/

const mockCategories = [
    {
        date: new Date(),
        username: "johnsmith",
        category: "My Notes"
    }
];

const mockNotes = [
    {
        date: new Date(),
        username: "johnsmith",
        category: mockCategories[0],
        title: "John Smith's First Note",
        body: "Lorem ipsum fragilistic expialadocious"
    },
    {
        date: new Date(),
        username: "johnsmith",
        category: mockCategories[0],
        title: "John Smith's Second Note",
        body: "suoicodalaipxe citsiligarf muspi meroL"
    }
];

export default {
    getNotes: username => {
        return new Promise((resolve, reject) => {
            try {
                const result = mockNotes.filter(note => note.username === username);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    },

    getCategories: username => {
        return new Promise((resolve, reject) => {
            try {
                const result = mockCategories.filter(category => category.username === username);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    },

    getNotesByCategory: (username, category) => {
        return new Promise((resolve, reject) => {
            try {
                const result = mockNotes.filter(note => note.username === username && note.category === category);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
};

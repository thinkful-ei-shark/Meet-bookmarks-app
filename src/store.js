// CRUD functionality for the main store object


const bookmarks = [];
let error = null;
let adding = false;
let filter = 0;


// loop through bookmarks array and find the object with a given value of id
const findById = function (id) {
    return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}


// add new bookmark object to the bookmarks array
const addBookmark = function (bookmark) {
    this.bookmarks.push(bookmark);
}


// delete a bookmark object based on an id 
const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id)
}


// update a bookmark object in the bookmarks array
const findAndUpdate = function (id, newData) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newData)
}


// setting the error function



export default {
    bookmarks,
    error,
    adding,
    filter,
    findById,
    addBookmark,
    findAndDelete,
    findAndUpdate 
}
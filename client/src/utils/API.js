import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
   // Gets all Habits
  getHabits: function() {
    return axios.get("/api/habits");
  },
  // Gets all Habits
  getHabitsByOktaId: function(oktaId) {
    axios.get("/api/habits/oktaId/" + oktaId).then(function(res){
      return res.data
    });
  },
  // Gets the Habit with the given id
  getHabit: function(id) {
    return axios.get("/api/habits/" + id);
  },
  // Deletes the Habit with the given id
  deleteHabit: function(id) {
    return axios.delete("/api/habits/" + id);
  },
  // Deletes the Habit with the given id
  updateHabit: function(id, updateInfo) {
    console.log(`API updateHabit() /api/habits/${id}`);
    return axios.put("/api/habits/update/" + id, updateInfo);
  },
  // Saves a Habit to the database
  saveHabit: function(habitData) {
    return axios.post("/api/habits", habitData);
  },
  // Sets lastCompletedDate to today
  updateDay: function(id) {
    return axios.put("/api/habits/" + id);
  }
};

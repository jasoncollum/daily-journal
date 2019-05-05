// console.log('data.js');
// Base URL
const apiBaseURL = "http://localhost:8088";

// Database calls:
const API = {
    getJournalEntries() {
        return fetch(`${apiBaseURL}/entries`)
            .then(response => response.json())
    },
    saveJournalEntry(newJournalEntry) { // SAVE new entry condition
        return fetch(`${apiBaseURL}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newJournalEntry)
        })
            .then(response => response.json());
    },
    getOneJournalEntry(id) {        // EDIT BUTTON
        return fetch(`${apiBaseURL}/entries/${id}`)
            .then(response => response.json())
    },
    updateJournalEntry(id, updatedEntry) { // UPDATE entry condition
        return fetch(`${apiBaseURL}/entries/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEntry)
        })
            .then(response => response.json())
    },
    deleteJournalEntry(id) {        // DELETE BUTTON
        return fetch(`${apiBaseURL}/entries/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }
}
// console.log('main.js');
// Render form to DOM
renderForm();

const hiddenId = document.querySelector('#hidden-id');
const journalDate = document.querySelector('#journal-date');
const conceptsCovered = document.querySelector('#concepts-covered');
const journalBody = document.querySelector('#journal-body');
const mood = document.querySelector('#mood-select');
const submitBtn = document.querySelector('.submit-btn');
const hr = document.querySelector('#divider');
const searchInput = document.querySelector('#search-input');
const inputMessageDiv = document.querySelector('.input-message-div');
const incompleteMessageDiv = document.querySelector('.incomplete-message-div');

// FUNCTIONS
function createEntryObj(title, body, date, mood) {
    return {
        "title": title,
        "body": body,
        "date": date,
        "mood": mood
    }
}

function resetRadios() {
    radios.forEach(radio => {
        if (radio.checked) {
            radio.checked = false;
        }
    })
}

// EVENT LISTENERS
conceptsCovered.addEventListener('keyup', (e) => {
    if (e.target.value.length === 50) {
        inputMessageDiv.innerHTML = `<p>Please limit to 50 characters or less...</p>`;
    } else {
        inputMessageDiv.innerHTML = '';
    }
})

// Load all journal entries
API.getJournalEntries()
    .then(entries => render.renderJournals(entries));

// Save journal entry to database
formContainer.addEventListener('click', (e) => {
    // Reset the all fields must be completed message
    if (e.target.id === 'journal-date' || e.target.id === 'concepts-covered' || e.target.id === 'journal-body') {
        incompleteMessageDiv.innerHTML = '';
    }

    if (e.target.id === 'submit-btn') {
        e.preventDefault();
        // Check that all fields have been filled out
        if (!journalDate.value || !conceptsCovered.value || !journalBody.value) {
            incompleteMessageDiv.innerHTML = `<p>All fields must be completed...</p>`;
        } else {
            const journalEntry = createEntryObj(
                conceptsCovered.value,
                journalBody.value,
                journalDate.value,
                mood.value
            )
            // Reset form input values
            journalDate.value = '';
            conceptsCovered.value = '';
            journalBody.value = '';
            mood.value = 'happy';
            // Check for ID value to determine whether to Update existing entry or Save new entry
            if (!hiddenId.value) {
                API.saveJournalEntry(journalEntry)
                    .then(response => {
                        API.getJournalEntries()
                            .then(entries => render.renderJournal(entries))
                    })
            } else {
                API.updateJournalEntry(hiddenId.value, journalEntry)
                    .then(response => {
                        API.getJournalEntries()
                            .then(entries => render.renderJournal(entries))
                            .then(() => {
                                hiddenId.value = '';
                                moodFilterContainer.classList.remove('hidden')
                                hr.classList.remove('hidden')
                            })
                    })
            }
        }
    }
})

// Listeners for Edit and Delete Buttons on each entry
journalDisplay.addEventListener('click', (e) => {
    e.preventDefault();

    const targetArray = e.target.id.split('--');
    const targetName = targetArray[0];
    const targetId = targetArray[1];

    // If edit button
    if (targetName === 'edit') {
        API.getOneJournalEntry(targetId)
            .then(entry => {
                journalDisplay.innerHTML = '';
                conceptsCovered.value = entry.title;
                journalBody.value = entry.body;
                journalDate.value = entry.date;
                mood.value = entry.mood;
                hiddenId.value = entry.id;

                moodFilterContainer.className = 'hidden';
                hr.className = 'hidden';
            })

    }

    // If delete button
    if (targetName === 'delete') {
        API.deleteJournalEntry(targetId)
            .then(response => {
                API.getJournalEntries()
                    .then(entries => render.renderJournal(entries));
            })
    }
})

// Listener for search term input
searchContainer.addEventListener('keypress', (e) => {
    // console.log(e.charCode)
    if (e.charCode === 13) {
        const searchTerm = e.target.value.toLowerCase();
        searchInput.value = '';
        API.getJournalEntries()
            .then(entries => render.filteredEntriesBySearchTerm(entries, searchTerm))
    }
})


// Test title and entry for curse words ??? *****
// Add a SHOW ALL ENTRIES button ?
// Determine when to invoke resetRadios() ***


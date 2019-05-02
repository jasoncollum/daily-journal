// console.log('main.js');
// Test title and entry for curse words ???

// Render form to DOM
renderForm();

const journalDate = document.querySelector('#journal-date');
const conceptsCovered = document.querySelector('#concepts-covered');
const journalEntry = document.querySelector('#journal-entry');
const mood = document.querySelector('#mood-select');
const submitBtn = document.querySelector('.submit-btn');
const inputMessageDiv = document.querySelector('.input-message-div');
const incompleteMessageDiv = document.querySelector('.incomplete-message-div');

function createEntryObj(title, body, date, mood) {
    return {
        "title": title,
        "body": body,
        "date": date,
        "mood": mood
    }
}

conceptsCovered.addEventListener('keyup', (e) => {
    if (e.target.value.length === 50) {
        inputMessageDiv.innerHTML = `<p>Please limit to 50 characters or less...</p>`;
    }
})

// Load all journal entries
API.getJournalEntries()
    .then(entries => render.renderJournal(entries));

// Save journal entry to database
formContainer.addEventListener('click', (e) => {
    if (e.target.id === 'journal-date' || e.target.id === 'concepts-covered' || e.target.id === 'journal-entry') {
        inputMessageDiv.innerHTML = '';
        incompleteMessageDiv.innerHTML = '';
    } else if (e.target.id === 'journal-submit-btn') {
        e.preventDefault();

        if (!journalDate.value || !conceptsCovered.value || !journalEntry.value) {
            incompleteMessageDiv.innerHTML = `<p>All fields must be completed...</p>`;
        } else {
            const newJournalEntry = createEntryObj(
                conceptsCovered.value,
                journalEntry.value,
                journalDate.value,
                mood.value
            )

            renderForm();

            API.saveJournalEntry(newJournalEntry)
                .then(response => {
                    API.getJournalEntries()
                        .then(entries => render.renderJournal(entries));
                })
        }
    }
})

// Random challenge exercise...
// function countVowels(str) {
//     const stringArr = str.toLowerCase().split('');
//     const vowels = ['a', 'e', 'i', 'o', 'u'];
//     const filteredVowels = stringArr.filter(letter => vowels.includes(letter));
//     console.log(filteredVowels.length)
//     const letterY = stringArr.filter(letter => letter === 'y');
//     if (letterY.length !== 0) {
//         const sometimesY = `There are ${filteredVowels.length + letterY.length} vowels if you include Y`;
//         console.log(sometimesY);
//     }
// }


// countVowels('A dog named Sydney')

// function matchVowels(string) {
//     console.log(string.match(/[aeiou]/gi))
// }

// matchVowels('A dog named Sydney')

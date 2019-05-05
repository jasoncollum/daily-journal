const formContainer = document.querySelector('#form-container');
const moodFilterContainer = document.querySelector('#mood-filter-container');
moodFilterContainer.classList.add('transparent-bg');
let moodOptions;
let radios;

const formEl = document.createElement('form');
const editFormEl = document.createElement('form');
const moodFilterDiv = document.createElement('div');
const moodFilterPg = document.createElement('p');


// Build and Render FORM
function renderForm() {
    formContainer.innerHTML = '';
    formEl.innerHTML = `
            <div class="journal-form shadow-bottom">
                <h1>Daily Journal</h1>
                <hr>
                <input type="text" name="hidden-id" id="hidden-id" class="hidden">
                <fieldset>
                    <label for="journal-date">Date Of Entry</label>
                    <input type="date" name="journal-date" id="journal-date" required>
                </fieldset>
                <fieldset>
                    <label for="concepts-covered" onkeyup="maxLengthAlert()">Concepts Covered</label>
                    <input type="text" name="concepts-covered" id="concepts-covered" maxlength="50" required>
                </fieldset>
                <div class="input-message-div"></div>
                <fieldset>
                    <label for="journal-body">Journal Entry</label>
                    <textarea name="journal-body" id="journal-body" cols="30" rows="4" required></textarea>
                </fieldset>
                <div class="incomplete-message-div"></div>
                <fieldset>
                    <label for="mood-select">
                        <select name="mood-select" id="mood-select">
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="need-coffee">Need Coffee</option>
                        </select>
                    </label>
                </fieldset>
            </div>
            <input id="submit-btn" class="shadow-bottom" type="submit" value="Save Journal Entry">
    `
    formContainer.append(formEl);
    renderMoodFilter();
    radios = document.querySelectorAll('input[type=radio]');
}

// Build and render MOOD Radio Buttons
function renderMoodFilter() {
    moodOptions = document.querySelectorAll('#mood-select option');
    moodFilterPg.textContent = 'Filter Journal Entries By Mood:';
    moodFilterContainer.append(moodFilterPg);

    moodOptions.forEach(option => {
        moodFilterDiv.innerHTML += `
            <input type="radio" id="${option.value}" name="filter-option" value="${option.value}">
            <label for="${option.value}">${option.textContent}</label>
        `
    })

    moodFilterContainer.append(moodFilterDiv);
    return
}

// Event listener for mood filter section
moodFilterContainer.addEventListener('change', (e) => {
    API.getJournalEntries()
        .then(entries => render.renderFilteredEntries(entries, e.target.value))
})

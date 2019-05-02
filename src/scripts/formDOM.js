const formContainer = document.querySelector('#form-container');
const moodFilterContainer = document.querySelector('#mood-filter-container');
moodFilterContainer.classList.add('transparent-bg');

const formEl = document.createElement('form');
const moodFilterDiv = document.createElement('div');
const moodFilterPg = document.createElement('p');
// const moodFilterFieldset = document.createElement('fieldset');
// moodFilterFieldset.classList.add('radio-group');

// Build and render form
function renderForm() {
    formContainer.innerHTML = '';
    formEl.innerHTML = `
            <div class="journal-form shadow-bottom">
                <h1>Daily Journal</h1>
                <hr>
                <fieldset>
                    <label for="journal-date">Date Of Entry</label>
                    <input type="date" name="journal-date" id="journal-date" required>
                </fieldset>
                <div class="input-message-div"></div>
                <fieldset>
                    <label for="concepts-covered" onkeyup="maxLengthAlert()">Concepts Covered</label>
                    <input type="text" name="concepts-covered" id="concepts-covered" maxlength="50" required>
                </fieldset>
                <fieldset>
                    <label for="journal-entry">Journal Entry</label>
                    <textarea name="journal-entry" id="journal-entry" cols="30" rows="4" required></textarea>
                </fieldset>
                <div class="incomplete-message-div"></div>
                <fieldset>
                    <label for="Mood For The Day">
                        <select name="mood-select" id="mood-select">
                            <option value="happy">Happy</option>
                            <option value="sad">Sad</option>
                            <option value="need-coffee">Need Coffee</option>
                        </select>
                    </label>
                </fieldset>
            </div>
            <input id="journal-submit-btn" class="shadow-bottom" type="submit" value="Save Journal Entry">
    `
    formContainer.append(formEl);
    renderMoodFilter();
}

// Build and render mood selection
function renderMoodFilter() {
    moodFilterContainer.innerHTML = '';
    moodFilterDiv.innerHTML = '';
    const moodOptions = document.querySelectorAll('#mood-select option');
    moodFilterPg.textContent = 'Filter Journal Entries By Mood:';
    moodFilterContainer.append(moodFilterPg);

    moodOptions.forEach(option => {
        let optionLc = option.text.toLowerCase();
        moodFilterDiv.innerHTML += `
            <input type="radio" id="${optionLc}" name="filter-option" value="${optionLc}">
            <label for="${optionLc}">${option.textContent}</label>
        `
    })

    moodFilterContainer.append(moodFilterDiv);
}

// Event listener for mood filter section
moodFilterContainer.addEventListener('change', (e) => {
    API.getJournalEntries()
        .then(entries => render.renderFilteredEntries(entries, e.target.value))
})



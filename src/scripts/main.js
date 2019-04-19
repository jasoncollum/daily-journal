// console.log('main.js');
// Main application logic that uses the functions and objects
// defined in the other JavaScript files.
// objectWithGetterMethod.methodToGetData().then(functionThatRenderData)
API.getJournalEntries()
    .then(entries => render.renderJournal(entries));



let myNotes = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector('#input-btn');
const tabBtn = document.querySelector('#tab-btn');
const deleteBtn = document.querySelector('#delete-btn');
const ulEl = document.querySelector("#ul-el");
const notesFromLocalStorage = JSON.parse(localStorage.getItem("myNotes"));

if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage
    renderNotes(myNotes)
}

inputBtn.addEventListener('click', () => {
    if (inputEl.value !== "") {
        myNotes.push(inputEl.value);
        inputEl.value = '';
    }

    localStorage.setItem('myNotes', JSON.stringify(myNotes));
    console.log(localStorage.getItem('myNotes'));
    renderNotes(myNotes);
})

tabBtn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myNotes.push(tabs[0].url);
        localStorage.setItem('myNotes', JSON.stringify(myNotes));
        renderNotes(myNotes);
    })
})

deleteBtn.addEventListener('dblclick', () => {
    localStorage.clear();
    myNotes = [];
    renderNotes(myNotes);
})

function renderNotes(notes) {
    let listItems = ``;

    for (let i = 0; i < notes.length; i++) {
        listItems += `<li><a target="_blank" href="${notes[i]}">${notes[i]}</a></li>`;
    }

    ulEl.innerHTML = listItems;
}

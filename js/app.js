showNotes();
let addBtn = document.getElementById("addBtn");
let addNoteText = document.getElementById("addNoteText");

// add note button listener
addBtn.addEventListener("click", function () {
  textValue = addNoteText.value;

  let storedNotes = localStorage.getItem("notes");

  let notesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  } else {
    notesArr = [];
  }

  if (textValue != "") {
    notesArr.unshift(textValue);
  }
  addNoteText.value = "";
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotes();
});

// function to show notes from the local storage
function showNotes() {
  let elem = document.getElementById("notes");
  elem.innerHTML = "";
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  } else {
    notesArr = [];
  }
  if (notesArr.length > 0) {
    notesArr.forEach((note, index) => {
      elem.innerHTML += `
        <div id="note-${index}" class="card  m-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1}</h5>
                <p class="card-text">${note}</p>
                <button onclick="delNote(${index})" class="btn btn-primary">Delete</button>
            </div>
        </div>
         `;
    });
  } else {
    elem.innerHTML =
      '<em style="color: grey">Nothing to show, Add some notes to show here</em>';
  }
}

// delete button event listener
function delNote(n) {
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  } else {
    notesArr = [];
  }
  notesArr.splice(n, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotes();
}

// search button working
let searchBtn = document.getElementById("searchBtn");
let searchText = document.getElementById("searchText");

searchText.addEventListener("input", function (e) {
  //   getting notes from local storage
  let storedNotes = localStorage.getItem("notes");
  let notesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  } else {
    notesArr = [];
  }

  notesArr.forEach((note, index) => {
    let noteCard = document.getElementById(`note-${index}`);
    if (note.includes(e.target.value)) {
      noteCard.style.display = "";
    } else {
      noteCard.style.display = "none";
    }
  });
});

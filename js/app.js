showNotes();
let addBtn = document.getElementById("addBtn");
let addNoteText = document.getElementById("addNoteText");
let addTitle = document.getElementById("addTitle");

// add note button listener
addBtn.addEventListener("click", function () {
  textValue = addNoteText.value;
  titleValue = addTitle.value;

  let storedNotes = localStorage.getItem("notes");
  let storedTitles = localStorage.getItem("titles");

  let notesArr = [];
  let titlesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
    titlesArr = JSON.parse(storedTitles);
  } else {
    notesArr = [];
    titlesArr = [];
  }

  if (textValue != "") {
    notesArr.unshift(textValue);
    titlesArr.unshift(titleValue);
  }
  addNoteText.value = "";
  addTitle.value = "";
  localStorage.setItem("notes", JSON.stringify(notesArr));
  localStorage.setItem("titles", JSON.stringify(titlesArr));
  showNotes();
});

// function to show notes from the local storage
function showNotes() {
  let elem = document.getElementById("notes");
  elem.innerHTML = "";

  let storedNotes = localStorage.getItem("notes");
  let storedTitles = localStorage.getItem("titles");

  let notesArr = [];
  let titlesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
    titlesArr = JSON.parse(storedTitles);
  } else {
    notesArr = [];
    titlesArr = [];
  }

  if (notesArr.length > 0) {
    notesArr.forEach((note, index) => {
      let showTitle = titlesArr[index] != "" ? titlesArr[index] : "no title";
      elem.innerHTML += `
        <div id="note-${index}" class="card  m-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${showTitle}</h5>
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
  let storedTitles = localStorage.getItem("titles");

  let notesArr = [];
  let titlesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
    titlesArr = JSON.parse(storedTitles);
  } else {
    notesArr = [];
    titlesArr = [];
  }

  notesArr.splice(n, 1);
  titlesArr.splice(n, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  localStorage.setItem("titles", JSON.stringify(titlesArr));
  showNotes();
}

// search button working
let searchBtn = document.getElementById("searchBtn");
let searchText = document.getElementById("searchText");

searchText.addEventListener("input", function (e) {
  //   getting notes from local storage
  let storedNotes = localStorage.getItem("notes");
  let storedTitles = localStorage.getItem("titles");

  let notesArr = [];
  let titlesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
    titlesArr = JSON.parse(storedTitles);
  } else {
    notesArr = [];
    titlesArr = [];
  }

  notesArr.forEach((note, index) => {
    let title = titlesArr[index];

    let noteCard = document.getElementById(`note-${index}`);

    let match1 = note.toLowerCase().includes(e.target.value.toLowerCase());
    let match2 = title.toLowerCase().includes(e.target.value.toLowerCase());
    if (match1 || match2) {
      noteCard.style.display = "";
    } else {
      noteCard.style.display = "none";
    }
  });
});

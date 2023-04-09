showNotes();
let addBtn = document.getElementById("addBtn");
let addNoteText = document.getElementById("addNoteText");
let addTitle = document.getElementById("addTitle");
let addImp = document.getElementById("addImp");

// add note button listener
addBtn.addEventListener("click", function () {
  let titleValue = addTitle.value;
  let textValue = addNoteText.value;
  let impValue = addImp.checked;
  let timeValue = Date.parse(new Date());

  let storedNotes = localStorage.getItem("notes");

  let notesArr = [];
  if (storedNotes != null) {
    notesArr = JSON.parse(storedNotes);
  } else {
    notesArr = [];
  }

  if (textValue != "") {
    notesArr.unshift({
      title: titleValue,
      note: textValue,
      timeStamp: timeValue,
      important: impValue
    });
  }
  addNoteText.value = "";
  addTitle.value = "";
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
      let showTitle = note.title != "" ? note.title : "no title";
      let d = new Date(note.timeStamp);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let hours = d.getHours()>12?d.getHours()-12:d.getHours();
      let timeStamp = `${hours<10?'0'+hours: hours}:${d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()} ${d.getHours()>12?'pm':'am'}, ${months[
        d.getMonth()
      ].slice(0, 3)} ${d.getDate()} ${d.getFullYear()}`;


      elem.innerHTML += `
        <div id="note-${index}" class="card ${note.important==true?'bg-danger bg-opacity-50':''} m-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${showTitle}</h5>
                <p class="card-text">${note.note}</p>
                <button onclick="delNote(${index})" class="btn btn-primary">Delete</button>
                <div class="cardDate ms-4 d-inline text-muted "><em>${timeStamp}</em></div>
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
    let title = note.title;

    let noteCard = document.getElementById(`note-${index}`);

    let match1 = note.note.toLowerCase().includes(e.target.value.toLowerCase());
    let match2 = note.title.toLowerCase().includes(e.target.value.toLowerCase());
    if (match1 || match2) {
      noteCard.style.display = "";
    } else {
      noteCard.style.display = "none";
    }
  });
});

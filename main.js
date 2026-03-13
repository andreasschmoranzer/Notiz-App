let notes = [
  {
    id: 1,
    title: "Amazon Abo kündigen",
    content:
      "Jetzt das Amazon abo zeitnah kündigen. Kündigungsfrist 4 Wochen zum Monatsende.",
    lastUpdated: 1773206052501,
  },
  {
    id: 2,
    title: "Netflix Abo kündigen",
    content:
      "Jetzt das Netflix abo zeitnah kündigen. Kündigungsfrist 4 Wochen zum Monatsende.",
    lastUpdated: 1763406052503,
  },
  {
    id: 3,
    title: "Entkalker kaufen beim Rewe",
    content:
      "Zitronensäure kaufen und den Schwimmer in der Klospülung entkalken.",
    lastUpdated: 1723406052504,
  },
];

console.log(notes);
console.log(notes.find((item) => item.title.includes("Entkalker")));

document.addEventListener("DOMContentLoaded", saveNote);

function displaySelectedNote(id) {
  console.log(id);
  const noteObject = notes.find((item) => item.id === id);
  console.log(noteObject);
  document.querySelector("#notes-title-input").value = noteObject.title;
  document.querySelector("#notes-description-input").value = noteObject.content;
}

function createNoteCard(note, divId) {
  const noteCardDiv = document.createElement("div");
  const noteTitle = document.createElement("h2");
  const noteContent = document.createElement("p");
  const noteDate = document.createElement("p");

  const date = new Date(note.lastUpdated);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  noteTitle.appendChild(document.createTextNode(note.title));
  noteContent.appendChild(document.createTextNode(note.content));
  noteDate.innerHTML =
    day +
    "." +
    month +
    "." +
    year +
    ", " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  noteCardDiv.classList.add("note-card");
  noteCardDiv.id = note.id;
  noteTitle.classList.add("note-title");
  noteContent.classList.add("note-content");
  noteDate.classList.add("note-date");

  noteCardDiv.appendChild(noteTitle);
  noteCardDiv.appendChild(noteContent);
  noteCardDiv.appendChild(noteDate);

  noteCardDiv.setAttribute("onclick", `displaySelectedNote(${note.id})`);

  divId.appendChild(noteCardDiv);
}

function saveNote() {
  notes.sort((itemA, itemB) => itemB.lastUpdated - itemA.lastUpdated);
  console.log(notes);
  notes.forEach((note) => {
    const storageMobile = document.querySelector("#storage-mobile");
    createNoteCard(note, storageMobile);
    const storageDesktop = document.querySelector("#storage-desktop");
    createNoteCard(note, storageDesktop);
  });
}

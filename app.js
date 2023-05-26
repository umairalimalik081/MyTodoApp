let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let errorMessage = document.getElementById("errorMessage");
let errorMessage1 = document.getElementById("errorMessage1");
let errorMessage2 = document.getElementById("errorMessage2");
let tasks = document.getElementById("tasks");
let addButton = document.getElementById("addButton");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("submitted");
  formValidation();
});

let formValidation = () => {
  if (
    textInput.value === "" &&
    dateInput.value === "" &&
    textArea.value === ""
  ) {
    console.log("failure");
    errorMessage.innerHTML = "Title cannot be blank";
    errorMessage1.innerHTML = "Date cannot be empty";
    errorMessage2.innerHTML = "TextArea cannot be blank";
  } else {
    console.log("Success");
    errorMessage.innerHTML = "";
    errorMessage1.innerHTML = "";
    errorMessage2.innerHTML = "";

    acceptData();
    addButton.setAttribute("data-dismiss", "modal");
    addButton.click();
    (() => {
      addButton.setAttribute("data-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTask();
};

let createTask = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id=${y}>
    <h6 class="fw-bold">${x.text}</h6>
    <span class="small text-secondary"> ${x.date}</span>
    <p>${x.description}></p>
    
    <span class="options" id="options" >
        <i onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
        <i onClick="deleteTask(this)" class="fa-solid fa-trash"></i>
    </span>
    </div> `);
  });
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
  console.log("data");
})();

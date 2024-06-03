// Select the form element, input element, and the unordered list element
const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// Retrieve the list from localStorage and parse it to JavaScript object/array
let list = JSON.parse(localStorage.getItem("list"));

// If the list exists in localStorage, iterate over each task and add it to the to-do list
if (list) {
  list.forEach((task) => {
    toDoList(task);
  });
}

// Add an event listener to handle form submission
formEl.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  toDoList(); // Call the toDoList function to add a new task
});

// Function to add a task to the to-do list
function toDoList(task) {
  let newTask = inputEl.value; // Get the task value from the input field
  if (task) {
    newTask = task.name; // If a task is provided, use its name
  }

  const liEl = document.createElement("li"); // Create a new list item element
  if (task && task.checked) {
    liEl.classList.add("checked"); // If the task is checked, add the 'checked' class
  }
  liEl.innerText = newTask; // Set the text of the list item to the task name
  ulEl.appendChild(liEl); // Append the list item to the unordered list
  inputEl.value = ""; // Clear the input field

  // Create a check button element
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
    <i class="fas fa-check-square"></i>
  `;
  liEl.appendChild(checkBtnEl); // Append the check button to the list item

  // Create a trash button element
  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
    <i class="fas fa-trash"></i>
  `;
  liEl.appendChild(trashBtnEl); // Append the trash button to the list item

  // Add an event listener to toggle the 'checked' class when the check button is clicked
  checkBtnEl.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage(); // Update localStorage with the new state
  });

  // Add an event listener to remove the list item when the trash button is clicked
  trashBtnEl.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage(); // Update localStorage with the new state
  });

  // Update localStorage with the current state of the list
  updateLocalStorage();
}

// Function to update localStorage with the current state of the to-do list
function updateLocalStorage() {
  const liEls = document.querySelectorAll("li"); // Select all list items
  list = []; // Initialize an empty array to store the list items
  liEls.forEach((liEl) => {
    list.push({
      name: liEl.innerText, // Add the text of the list item to the list
      checked: liEl.classList.contains("checked"), // Add the checked state of the list item
    });
  });
  localStorage.setItem("list", JSON.stringify(list)); // Store the updated list in localStorage
}

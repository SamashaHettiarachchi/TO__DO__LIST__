document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("task"));

  if (storedTasks) {
    task = storedTasks; // Directly assign to task array
    updateTaskList();
    updateStats();
  }
});

let task = [];

// Save tasks to local storage
const saveTasks = () => {
  localStorage.setItem("task", JSON.stringify(task)); // Corrected typo
};

// Add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    task.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

// Update the task list display
const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks before re-rendering

  task.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `<div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          }/>
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <i class="fa-solid fa-edit edit-icon" onclick="editTask(${index})"></i>
          <i class="fa-solid fa-trash-can trash-icon" onclick="deleteTask(${index})"></i>
        </div>
      </div>`;

    // Attach the event listener to the checkbox
    listItem
      .querySelector(".checkbox")
      .addEventListener("change", () => toggleTaskComplete(index));

    taskList.append(listItem); // Add the new list item to the task list
  });
};

// Toggle the completion status of a task
const toggleTaskComplete = (index) => {
  task[index].completed = !task[index].completed; // Toggle the completed status
  updateTaskList(); // Refresh the task list to apply styles
  updateStats(); // Update the progress stats
  saveTasks(); // Save the updated task list to local storage
};

// Delete a task
const deleteTask = (index) => {
  task.splice(index, 1); // Remove the task at the specified index
  updateTaskList(); // Refresh the task list
  updateStats(); // Update the progress stats
  saveTasks(); // Save the updated task list to local storage
};

// Edit a task
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = task[index].text; // Set the input value to the task's text
  task.splice(index, 1); // Remove the task from the array
  updateTaskList(); // Refresh the task list
  updateStats(); // Update the progress stats
  saveTasks(); // Save the updated task list to local storage
};

// Update the progress bar and stats
const updateStats = () => {
  const completeTasks = task.filter((task) => task.completed).length;
  const totalTasks = task.length;
  const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0; // Prevent division by zero
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`; // Set the width of the progress bar

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks}/${totalTasks}`; // Display the numbers

  if (task.length && completeTasks === totalTasks) {
    blaskConfetti();
  }
};

// Event listener for adding a new task
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blaskConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"], // Default shape
    colors: ["#3498db", "#2980b9", "#1f618d", "#5dade2", "#85c1e9"], // Blue shades
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ["star"], // Stars will use the blue colors
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ["circle"], // Circles will use blue colors as well
    });
  }

  // Trigger confetti at different intervals
  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};

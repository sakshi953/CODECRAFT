// Get elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add task
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task list item
    const li = document.createElement("li");

    // Create task text element
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Create task actions container
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("task-actions");

    // Create completed button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", toggleComplete);
    actionsDiv.appendChild(completeBtn);

    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", editTask);
    actionsDiv.appendChild(editBtn);

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", deleteTask);
    actionsDiv.appendChild(deleteBtn);

    // Append actions and task to the list
    li.appendChild(actionsDiv);
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = "";
}

// Toggle task completion
function toggleComplete(e) {
    const task = e.target.closest('li');
    task.classList.toggle("completed");
}

// Edit task
function editTask(e) {
    const task = e.target.closest('li');
    const taskText = task.querySelector("span").textContent;
    const newTaskText = prompt("Edit task:", taskText);

    if (newTaskText !== null && newTaskText.trim() !== "") {
        task.querySelector("span").textContent = newTaskText;
    }
}

// Delete task
function deleteTask(e) {
    const task = e.target.closest('li');
    taskList.removeChild(task);
}

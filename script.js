const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', () => {
  getTasks().forEach(task => createTaskElement(task));
});

// Add new task
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return alert('Please enter a task!');
  const newTask = { id: Date.now(), text, completed: false };
  saveTask(newTask);
  createTaskElement(newTask);
  taskInput.value = '';
});

// Create task element
function createTaskElement(task) {
  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.className = 'task-checkbox';
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    li.classList.toggle('completed', checkbox.checked);
    updateTask(task);
  });

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
    deleteTask(task.id);
  };

  li.append(checkbox, span, deleteBtn);
  taskList.appendChild(li);
}

// Get all tasks
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save new task
function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task's completed state
function updateTask(updatedTask) {
  const tasks = getTasks().map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete a task
function deleteTask(taskId) {
  const tasks = getTasks().filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

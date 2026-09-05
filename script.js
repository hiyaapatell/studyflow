const tasks = [
  ["Review UX notes", "30 min", "Design"],
  ["Finish Python project", "60 min", "Coding"],
  ["Read Chapter 4", "25 min", "Study"],
  ["Prepare tomorrow's plan", "10 min", "Planning"]
];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.className = "task";
    item.innerHTML = `
      <input type="checkbox" onchange="completeTask(${index}, this)">
      <div class="task-info">
        <strong>${task[0]}</strong>
        <small>${task[1]}</small>
      </div>
      <span class="tag">${task[2]}</span>
    `;
    list.appendChild(item);
  });
}

function completeTask(index, checkbox) {
  checkbox.closest(".task").classList.toggle("completed", checkbox.checked);
}

function addTask() {
  const name = prompt("What do you want to study?");
  if (!name) return;
  tasks.push([name, "25 min", "New"]);
  renderTasks();
}

let seconds = 25 * 60;
let running = false;
let interval;

function updateTimer() {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
}

function toggleTimer() {
  const button = document.getElementById("timerBtn");
  if (running) {
    clearInterval(interval);
    running = false;
    button.textContent = "Resume focus";
  } else {
    running = true;
    button.textContent = "Pause";
    interval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        updateTimer();
      } else {
        clearInterval(interval);
        running = false;
        button.textContent = "Start focus";
        alert("Focus session complete! 🎉");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(interval);
  running = false;
  seconds = 25 * 60;
  document.getElementById("timerBtn").textContent = "Start focus";
  updateTimer();
}

renderTasks();
updateTimer();

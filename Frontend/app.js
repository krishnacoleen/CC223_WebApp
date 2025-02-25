const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

async function loadTasks() {
    try {
        const response = await fetch("http://localhost:3000/tasks");
        const tasks = await response.json();
        listContainer.innerHTML = "";
        tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            span.onclick = () => deleteTask(index);
            li.appendChild(span);
            li.onclick = () => toggleTask(index);
            listContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

async function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
        return;
    }
    await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: inputBox.value })
    });
    inputBox.value = "";
    loadTasks();
}

async function deleteTask(index) {
    await fetch(`http://localhost:3000/tasks/${index}`, {
        method: "DELETE"
    });
    loadTasks();
}

async function toggleTask(index) {
    await fetch(`http://localhost:3000/tasks/${index}`, {
        method: "PUT"
    });
    loadTasks();
}

loadTasks();

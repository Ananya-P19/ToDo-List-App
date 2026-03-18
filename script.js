// Request permission as soon as the app loads
// Initial Setup & Permissions
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
// 2. DOM Elements
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const statusBar = document.getElementById('statusBar');
const fabBtn = document.getElementById('fabBtn');
const attachmentMenu = document.getElementById('attachmentMenu');
const closeMenu = document.getElementById('closeMenu');

// 3. Main Global Event Listeners
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    addTodo();
    }
});
fabBtn.onclick = () => attachmentMenu.classList.toggle('hidden');
closeMenu.onclick = () => attachmentMenu.classList.add('hidden');

// 4. Core Functions (addTodo, updateStatus)
function updateStatus() {
    const totalItems = todoList.querySelectorAll('li').length;
    const completedItems = todoList.querySelectorAll('li.completed').length;
    const remaining = totalItems - completedItems;
    
    statusBar.textContent = `${remaining} items remaining`;
    sendDeviceNotification(remaining);

// Optional: Trigger a logic-based "alert" in console/UI if count is high
    if (remaining > 5) {
        statusBar.style.color = "red";
        statusBar.style.fontWeight = "bold";
    } else {
        statusBar.style.color = "#666";
        statusBar.style.fontWeight = "normal";
    }
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
    // Use the helper function to create the element
        const li = createListItem(todoText);

    // Add it to the main list    
        todoList.appendChild(li);

    // Reset the UI
        todoInput.value = '';
        todoInput.focus();

    // Update the remaining count
        updateStatus();
        saveTasks(); 
    }
}

// 5. Card Management (Multiple Lists)
function createNewList(title = "New Task Group"){
    const listsContainer = document.getElementById('listsContainer');

        // You must define 'card' before you can append it
    const card = document.createElement('div');
    card.className = "task-card";
    
        // We use a Template Literal to create the Title Bar and the UL
    card.innerHTML = `
        <div class="card-header">
            <input type="text" value="${title}" class="title-input">
            <button onclick="this.closest('.task-card').remove(); updateStatus();">🗑️</button>
        </div>
        <div class="card-body">
            <ul class="card-list"></ul>
            <div class="card-footer">
                <input type="text" placeholder="Add item..." class="card-item-input">
                <button onclick="addItemToCard(this)">Add</button>
            </div>
        </div>`;
        listsContainer.appendChild(card);
        attachmentMenu.classList.add('hidden');
        updateStatus(); // Update count coz a new (empty) list was added
}

function addItemToCard(button) {
    const input = button.previousElementSibling;
    const list = button.closest('.card-body').querySelector('.card-list');
    
    if (input.value.trim() !== '') {
            // Reuse the same helper function here!
        const li = createListItem(input.value.trim());
        list.appendChild(li);
    }
}

// 6. Data Persistence (LocalStorage)
// Function to save to LocalStorage
function saveTasks() {
    // Logic to save the current state of ALL lists
    const tasks = [];
    document.querySelectorAll('#todoList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Function to load from LocalStorage on startup
function loadTasks() {
    // Logic to rebuild lists from storage
    const saved = JSON.parse(localStorage.getItem('myTasks') || "[]");
    saved.forEach(task => {
        // You would call your addTodo logic here for each saved task
    });
}

// 7. Initialize
loadTasks();

function sendDeviceNotification(count) {
    if (Notification.permission === "granted" && count > 0) {
        new Notification("Task Reminder", {
            body: `You still have ${count} tasks remaining!`,
            icon: "https://cdn-icons-png.flaticon.com/512/906/906334.png" // Optional icon
        });
    }
}

function createListItem(text) {
    const li = document.createElement('li');
    // Create a span for the text (so clicking text doesn't trigger the button)
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.style.flex = "1";
    
    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';

    // Set up the delete logic
    deleteBtn.onclick = (e) => {
        e.stopPropagation(); // Prevents triggering the completion toggle
        li.remove();
        updateStatus();
        saveTasks();
    };
    
    // Add Toggle Completion
    li.onclick = () => {
        li.classList.toggle('completed');
        updateStatus();
        saveTasks();
    };

    // Assemble the parts
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    return li; // Send the finished element back to whoever called it
}





const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const statusBar = document.getElementById('statusBar');

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
    addTodo();
    }
});

function updateStatus() {
    const totalItems = todoList.querySelectorAll('li').length;
    const completedItems = todoList.querySelectorAll('li.completed').length;
    const remaining = totalItems - completedItems;
    
    statusBar.textContent = `${remaining} items remaining`;
    
    // Optional: Trigger a logic-based "alert" in console or UI if count is high
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
        const li = document.createElement('li');
        // li.textContent = todoText;
     // Create a span for the text so clicking text doesn't trigger bn
        const textSpan = document.createElement('span');
        textSpan.textContent = todoText;
        textSpan.style.flex = "1";
        li.appendChild(textSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            li.remove();
            updateStatus();
        };
        
        // Add Toggle Completion
        li.onclick = () => {
            li.classList.toggle('completed');
            updateStatus();
        };

        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        // Clear input
        todoInput.value = '';
        todoInput.focus();

        // Update the remaining count
        updateStatus();
        }
    }

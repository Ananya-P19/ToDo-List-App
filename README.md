# 📝 Advanced Modular To-Do App

A sophisticated, vanilla JavaScript task manager that supports multiple categorized lists, device-level notifications, and persistent data storage. This project demonstrates advanced DOM manipulation and a modular code structure.

## 🚀 Live Demo
[🚀 View Live Demo](https://ananya-p19.github.io/ToDo-List-App/)

## ✨ Key Features
* **Modular List System:** Create multiple independent task cards (e.g., Work, Personal, Groceries) with their own title bars.
* **Device Notifications:** Integrated with the Browser Notification API to alert you of remaining tasks directly on your OS.
* **Intelligent Status Tracking:** Dynamic "Items Remaining" counter that changes color (Red Alert) when your workload exceeds 5 tasks.
* **Data Persistence:** Full LocalStorage integration ensures your lists and completion statuses survive page refreshes.
* **Attachment Menu:** A floating action button (FAB) UI for quickly adding new categorized lists.
* **Responsive UI:** Optimized with CSS Media Queries for a seamless experience on mobile and desktop.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure and custom data attributes.
* **CSS3:** Flexbox layout, custom animations, and mobile-first responsive design.
* **JavaScript (ES6+):** Utilizes functional abstraction, event delegation, and Web APIs (Notification & LocalStorage).

## 📂 Project Structure
* `index.html` - The skeleton of the application and the attachment menu.
* `style.css` - Contains the "Task Card" styling and responsive media queries.
* `script.js` - The core engine using a modular `createListItem` factory pattern.

## 📖 How to Use
1.  **Clone the Repo:** `git clone https://github.com/your-username/your-repo-name.git`
2.  **Open:** Launch `index.html` in any modern browser.
3.  **Permissions:** Allow "Notifications" when prompted to receive device alerts.
4.  **Manage:** Add tasks to the main list or use the "+" button to create a new category card.

---
*Developed by Ananya as part of a Full-Stack development journey.*

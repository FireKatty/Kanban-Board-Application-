# Kanban-Board-Application-
Amaha Frontend Assignment 


### 1. KanbanPage:
    Displays a header with the Kanban title and user information (Welcome message).
    Contains a logout button and a fixed button to add new columns.
    Displays the KanbanBoard component that contains the board itself.

### 2. KanbanBoard:

    Manages columns and tasks, allowing for CRUD operations on columns and tasks.
    Implements drag-and-drop functionality for task reordering using the @dnd-kit library.
    Handles task creation and editing through modals and forms.
    Handles column renaming and deletion with confirmation dialogs.
   ## OPTIONAL ENHANCEMENT - Includes a search functionality to filter tasks by title and description.

### 3. Column:
    Displays a column with its tasks and supports drag-and-drop reordering of tasks within the column.
    Allows task addition for each column.

### 4. SortableTask:
    Displays a task with options to edit, delete, and toggle completion.
    Supports drag-and-drop within the column using the @dnd-kit library.
    Displays assigned users for each task.

## Prerequisites:

1.Node.js: Make sure you have Node.js installed. You can check if it's installed by running node -v in the terminal.

2.npm: npm (Node Package Manager) is typically installed alongside Node.js. You can verify it with npm -v.

# Steps to Set Up the Application:

1->Clone the Repository: If you haven't already cloned your repository, do it by running the following command in your terminal:

## git clone <https://github.com/FireKatty/Kanban-Board-Application->
## cd <project_directory>

2->Install Dependencies: After navigating to your project folder, install the necessary dependencies by running:

# npm install

3->Create a .env file (if required): If your project uses environment variables (like API keys, DB credentials,JWT_KEY,MONGO_URI), create a .env file at the root of the project and add any necessary

4-Change API URL in Login Page and CORS in server.js - 
## http://localhost:9876/


4->Run the Application: To start the development server and view your app locally, use the following command:

## npm start 

     or 

## cd backend && node server.js
## cd frontend && npm start

->This will start a local development server, and the application should be available at http://localhost:3000.



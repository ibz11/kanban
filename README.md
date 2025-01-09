# Kanban Board Application

## Objective
This project involves the development of a straightforward yet functional Kanban board application, where users can manage tasks efficiently through a visual board. The app provides a front-end interface built with React, paired with a back-end API that facilitates the management of tasks across various columns.

Key features of the app include drag-and-drop functionality for seamless task movement, and full support for CRUD (Create, Read, Update, Delete) operations to handle tasks. One can easily add new tasks, update their details, and remove them as needed, making task management intuitive and dynamic. The application allows tasks to be organized into distinct columns, enhancing clarity and workflow control.

## Technologies Used
- **Frontend**: 
  - React (with optional TypeScript)
  - React-DnD (for drag-and-drop functionality)
  - TailwindCSS or styled-components (for styling)
  - Redux or React Context (for state management)
  
- **Backend**:
  - Node.js (with Express.js)
  - MongoDB 
  
- **Deployment**:
  - Frontend: Vercel
  - Backend: Vercel

## Features
- **Frontend**:
  - Task can be dragged and updated
  - Status color changes when dragging


  
- **Backend**:
  - Has the endpoints:
    - `GET /tasks`: Gets all tasks 
    - `POST /tasks`: Create a new task
    - `PUT /tasks/{id}`: Update task details
    - `PATCH /tasks/{id}`: Update status when you drag and drop
    - `DELETE /tasks/{id}`: Delete a task
    


## How to Set Up Locally

### Prerequisites
- Node.js installed
- MongoDB or an alternative database running locally (or use a cloud database service)
- API keys (for any third-party services if used)
  

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ibz11/kanban/
   cd server
2.Run npm install:
   This is to install all  the packages
   
3. Run npm run dev:
    This is to run the application




   
### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ibz11/kanban/
   cd client

2.Run npm install:
   This is to install all  the packages
   


3. Run npm run dev:
    This is to run the application
   

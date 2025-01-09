import React, { useState, } from "react";
import axios from "axios";
import { Task } from "../../types";

type UpdateFormProps = {
  task: Task;
  onUpdateSuccess: (updatedTask: Task) => void;
  onCancel: () => void;
};

const UpdateForm: React.FC<UpdateFormProps> = ({ task, onUpdateSuccess, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<"To-do" | "In-progress" | "Done">(task.status);

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTask = { title, description, status };

    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/task/${task._id}`,
        updatedTask
      );

      // Call the parent handler to update the tasks list
      onUpdateSuccess(response.data);

      // Clear the form and cancel editing
      onCancel();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <form onSubmit={handleUpdateTask}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as "To-do" | "In-progress" | "Done")}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="To-do">To-do</option>
            <option value="In-progress">In-progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Update Task
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;

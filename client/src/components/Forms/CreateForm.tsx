/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from "react";
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Task {
  id: string;
  title: string;
  description: string;
  status: "To-do" | "In-progress" | "Done";
}

const CreateForm= () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"To-do" | "In-progress" | "Done">("To-do");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, description, status };

    try {
      const response = await axios.post("http://localhost:4000/api/v1/task/", payload);
      
      
      
      console.log("Task created:", response.data);
     
      setTitle("");
      setDescription("");
      setStatus("To-do");
      setError(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create Task</h2>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

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
          <option value="To-do">Todo</option>
          <option value="In-progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 text-white rounded-md ${
          loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
};

export default CreateForm;

import React, { useState } from "react";
import axios from "axios";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (task: Task) => void;
  status: "To-do" | "In-progress" | "Done"; // Ensure status is one of these values
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: "To-do" | "In-progress" | "Done";
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onCreated, status }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: Omit<Task, "id"> = {
      title,
      description,
      status,
    };

    try {
      const response = await axios.post<Task>("https://your-api-endpoint.com/tasks", payload);
      onCreated(response.data); // Pass the newly created task to the parent
      onClose(); // Close the modal
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
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
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white rounded-md ${
                loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModal;

// CreateModal.tsx
import React, { useState } from 'react';
import { Task } from '../../types';

type CreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTask: Task) => void;
  status: string;
};

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, onSave,status }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
//    const [status, setStatus] = useState<"To-do" | "In-progress" | "Done">("To-do");

  if (!isOpen) return null;

  const handleSave = () => {
    if (title.trim() === '' || description.trim() === '') {
      alert('Please fill in both fields');
      return;
    }

    const newTask: Task = {
      
      title,
      description,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      status: status 
    };

    onSave(newTask); // Send the new task to the parent component
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="font-semibold text-lg">Create New Task</h2>
        <div className="mt-4">
          <label className="block text-sm">Task Title</label>
          <input
            type="text"
            className="mt-2 p-2 w-full border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Task Description</label>
          <textarea
            className="mt-2 p-2 w-full border rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>

        <input
            type="text"
            className="mt-2 p-2 w-full border rounded"
            value={status}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onChange={() => setStatus(status)}
            disabled
          />
      </div>



        <div className="mt-4 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

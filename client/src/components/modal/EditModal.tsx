// EditModal.tsx
import React, { useState } from 'react';
import { Task } from '../../types';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  task: Task;
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, task }) => {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(task.description);

  if (!isOpen) return null;

  const handleSave = () => {
    const updatedTask = {
      ...task,
      title: updatedTitle,
      description: updatedDescription,
    };
    onSave(updatedTask); // Save the changes
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="font-semibold text-lg">Edit Task</h2>
        <div className="mt-4">
          <label className="block text-sm"> Title</label>
          <input
            type="text"
            className="mt-2 p-2 w-full border rounded"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm">Description</label>
          <textarea
            className="mt-2 p-2 w-full border rounded"
            rows={4}
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
            Save 
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

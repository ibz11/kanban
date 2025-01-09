import React, { useState } from 'react';



interface Modal{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (status: string) => void;
}
const CreateModal:React.FC<Modal>= ({isOpen,onClose,onSubmit}) => {

    const [status, setStatus] = useState<string>('');

    if (!isOpen) return null;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(status);
      setStatus('');  // Clear input after submission
      onClose();      // Close the modal
    };

return (
<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold mb-4">Edit</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default CreateModal;

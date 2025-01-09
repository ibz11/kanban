import React from 'react';


interface DeleteModal{
    isOpen: boolean;
    onClose:() => void,
    onConfirm: () => void;

}
const DeleteModal:React.FC<DeleteModal> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete this goal?</p>
                <div className="flex justify-end">
                    <button 
                        className="bg-gray-300 text-gray-800 rounded px-4 py-2 mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-red-500 text-white rounded px-4 py-2"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
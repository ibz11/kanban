// Modal.tsx
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id:string) => void;
  id: string;
  title: string;
  message: string;
};

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm,id ,title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="mt-2 text-sm">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={()=>onConfirm(id)} className="px-4 py-2 bg-red-500 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-lg max-h-full overflow-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold">X</button>
        {children}
      </div>
    </div>
  );
}


export default Modal;
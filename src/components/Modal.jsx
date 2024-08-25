import React, { useRef } from 'react';

function Modal({ OnClose, OnConfirm, loading, children }) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) OnClose();
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="bg-white p-5 rounded-lg flex flex-col gap-5">
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 1116 0A8 8 0 014 12zm2 0a6 6 0 1012 0A6 6 0 006 12z"
              ></path>
            </svg>
            <span>Deleting...</span>
          </div>
        ) : (
          <>
            {children}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={OnClose}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={OnConfirm}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;

// MessageInputForm.js
import React from "react";

const MessageInputForm = ({ newMessage, setNewMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="relative  m-4 w-[85%]">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg outline-none rounded-s-gray-100 rounded-s-2 border border-gray-300"
        placeholder="Search"
        value={newMessage}
        onChange={(ev) => setNewMessage(ev.target.value)}
        required
      />
      <button
        type="submit"
        className="absolute top-0 end-0 px-1.5 h-full font-medium text-white bg-blue-700 rounded-e-lg "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

export default MessageInputForm;

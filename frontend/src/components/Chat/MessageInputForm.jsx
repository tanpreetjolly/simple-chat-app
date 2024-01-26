// MessageInputForm.js
import React from "react";

const MessageInputForm = ({ newMessage, setNewMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="relative  outline m-4">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
        placeholder="Search"
        value={newMessage}
        onChange={(ev) => setNewMessage(ev.target.value)}
        required
      />
      <button
        type="submit"
        className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border"
      >
        {/* ... */}
      </button>
    </form>
  );
};

export default MessageInputForm;

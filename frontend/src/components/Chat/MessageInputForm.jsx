// MessageInputForm.js
import React from "react";

const MessageInputForm = ({
  newMessage,
  setNewMessage,
  sendMessage,
  sendFile,
}) => {
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
      <label className="absolute top-0 end-9 bg-blue-200 p-2 text-gray-600 cursor-pointer rounded-sm border border-blue-200">
        <input type="file" className="hidden" onChange={sendFile} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 aspect-square"
        >
          <path
            fillRule="evenodd"
            d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
            clipRule="evenodd"
          />
        </svg>
      </label>
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

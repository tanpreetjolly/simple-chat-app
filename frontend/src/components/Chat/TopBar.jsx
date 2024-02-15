import React from 'react'

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  return (
    <div className="absolute right-2 text-white w-full py-5  bg-transparent z-20 backdrop-blur-xl flex items-center px-5 gap-2 text-lg font-semibold border-b border-gray-700 capitalize">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        role="button"
        onClick={(e) => setSelectedUserId(null)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      {
        <>
          {onlinePeople[selectedUserId] ? (
            <>
              {onlinePeople[selectedUserId].username}
              <span className="h-3 rounded-full aspect-square bg-green-400"></span>
            </>
          ) : (
            <>
              <span>{offlinePeople[selectedUserId].firstName}</span>

              <span className="h-3 rounded-full aspect-square bg-gray-400"></span>
            </>
          )}
        </>
      }
    </div>
  );
};

export default TopBar
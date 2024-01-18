const ChatHome = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="outline w-1/12 bg-blue-200">Nav</nav>
      <section className="outline w-4/12 bg-blue-200">Sidebar</section>
      <section className="outline w-7/12 bg-blue-400 relative pb-10">
        <div className="absolute bottom-4 w-4/5 left-1/2 transform -translate-x-1/2 ">
          <div class="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border"
            >
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatHome;

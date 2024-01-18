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
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
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

export default function Avatar({ username, userId, isOnline }) {
  const colors = [
    "bg-teal-200",
    "bg-red-200",
    "bg-violet-200",
    "bg-purple-200",
    "bg-indigo-200",
    "bg-yellow-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-fuchsia-200",
    "bg-rose-200",
  ];

  // console.log(username)
  const userIdBase10 = parseInt(userId.substring(10), 16);
  const colorIndex = userIdBase10 % colors.length;
  const color = colors[colorIndex];
  return (
    <div className={"w-8 h-8 relative rounded-full flex items-center " + color}>
      <div className="text-center w-full opacity-70">{username[0]}</div>
      <div className={`absolute h-2 aspect-square rounded-full right-0 bottom-1 ${isOnline && "bg-green-500" }`}></div>
    </div>
  );
}

import "./Avatar.css";
export default function Avatar({ username, userId, isOnline }) {
  // const colors = [
  //   "teal",
  //   "red",
  //   "violet",
  //   "purple",
  //   "bg-indigo",
  //   "orange",
  //   "pink",
  //   "green",
  //   "yellow",
  //   "blue",
  // ];


  // const userIdBase10 = parseInt(userId.substring(10), 16);
  // const colorIndex = userIdBase10 % colors.length;
  // const color = colors[colorIndex];
  return (
    <div className={`squircle relative text-black`}>
    
      <div className="squircle__inline text-xl text-white bg-primarySecond">
        {username[0]}
      </div>
      <div
        className={`absolute h-2 aspect-square rounded-full right-0 bottom-1 z-20 ${
          isOnline && "bg-green-500"
        }`}
      ></div>
      <style>
        {`
        .squircle {
          --squircle-fg: var(--bg, #ffffff);
          --squircle-size: 44px;
          --squircle-radii: 50% / 10%;
        
          aspect-ratio: 1;
          display: grid;
          grid-template-columns: 1fr;
          max-width: 80%;
        
          width: var(--squircle-size);
        }
        
        .squircle::before,
        .squircle::after {
          align-self: center;
          background-color: #6B8AFD; 
          content: "";
          grid-column: 1;
          grid-row: 1;
          justify-self: center;
        }
        
        .squircle::before,
        .squircle::after {
          border-radius: var(--squircle-radii);
          height: 115%;
          width: 100%;
        }
        
        .squircle::after {
          transform: rotate(90deg);
        }
        
        .squircle__inline {
          border-radius: 7%;
          display: grid;
          inset-block: 5%;
          inset-inline: 5%;
          place-content: center;
          position: absolute;
          z-index: 1;
        }
        
        
        `}
      </style>
    </div>
  );
}

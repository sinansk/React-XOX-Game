const ModeButton = ({ handleGameMode, playToCpu }) => {
  return (
    <button
      onClick={handleGameMode}
      id="theme-toggle"
      type="button"
      className="mr-2 max-w-fit text-slate-300 bg-transparent  hover:bg-slate-700 focus:outline-none ring-1 ring-cyan-100 rounded-lg text-sm p-2.5"
    >
      <svg
        className={`${playToCpu ? `hidden` : ``}`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M10.118 16.064c2.293-.529 4.428-.993 3.394-2.945-3.146-5.942-.834-9.119 2.488-9.119 3.388 0 5.644 3.299 2.488 9.119-1.065 1.964 1.149 2.427 3.394 2.945 1.986.459 2.118 1.43 2.118 3.111l-.003.825h-15.994c0-2.196-.176-3.407 2.115-3.936zm-10.116 3.936h6.001c-.028-6.542 2.995-3.697 2.995-8.901 0-2.009-1.311-3.099-2.998-3.099-2.492 0-4.226 2.383-1.866 6.839.775 1.464-.825 1.812-2.545 2.209-1.49.344-1.589 1.072-1.589 2.333l.002.619z" />
      </svg>
      <svg
        className={`${playToCpu ? `` : `hidden`} `}
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      >
        <path d="M17 24h-10v-1c1.533-.366 2.386-1.572 2.497-3h5.006c.111 1.427.964 2.634 2.497 3v1zm6-5c.265 0 .52-.105.707-.293.188-.187.293-.442.293-.707v-17c0-.265-.105-.52-.293-.707-.187-.188-.442-.293-.707-.293h-22c-.265 0-.52.105-.707.293-.188.187-.293.442-.293.707v17c0 .265.105.52.293.707.187.188.442.293.707.293h22zm-11-3.419c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm10-13.581h-20v12h20v-12z" />
      </svg>
    </button>
  );
};

export default ModeButton;

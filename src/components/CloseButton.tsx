import React, { MouseEvent, ReactElement } from "react";

interface CloseButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
}: CloseButtonProps): ReactElement => {
  return (
    <button
      onClick={onClick}
      className="group relative flex items-center justify-center rounded px-2 py-1.5 font-bold transition-all hover:bg-elementBg active:bg-activeElementBg"
      aria-label="close menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 384 512"
        color="currentColor"
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </button>
  );
};

export default CloseButton;

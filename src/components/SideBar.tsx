import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpeg";
import CloseButton from "./CloseButton";
import { useArticle } from "../context/ArticleContext";

interface SidebarProps {}

interface BurgerButtonProps {
  handleOpenSidebar: () => void;
  handleCloseSidebar: () => void;
  iconStyle: string;
  isSidebarOpen: boolean;
}

const MenuButton: React.FC<BurgerButtonProps> = ({
  handleOpenSidebar,
  iconStyle,
  isSidebarOpen,
  handleCloseSidebar,
}) => {
  return (
    <>
      {isSidebarOpen ? (
        <CloseButton onClick={handleCloseSidebar} />
      ) : (
        <button
          onClick={handleOpenSidebar}
          className={iconStyle}
          aria-label="open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            color="currentColor"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </button>
      )}
    </>
  );
};

const HomeButton: React.FC = () => {
  return (
    <Link to="/">
      <img className="m-auto w-8 rounded-full" src={logo} alt="Logo" />
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = () => {
  const { generatedArticles, handleSelectedId, selectedId } = useArticle();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const sidebarClasses = `bg-subtleBg flex h-screen flex-col justify-between border-subtleBorder fixed sm:sticky top-0 z-10 ${
    isSidebarOpen
      ? "w-64 p-4 border-e h-screen"
      : "w-0 sm:w-16 sm:border-e sm:p-4"
  } overflow-x-hidden transition-all duration-500 ease-in-out`;

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const iconStyle =
    "text-left items-center font-bold transition-all hover:bg-elementBg active:bg-activeElementBg group relative flex justify-center rounded px-2 py-1.5";

  return (
    <>
      <div className="absolute flex h-16 w-full items-center justify-between p-4 sm:hidden">
        <HomeButton />
        <MenuButton
          handleOpenSidebar={handleOpenSidebar}
          iconStyle={iconStyle}
          isSidebarOpen={isSidebarOpen}
          handleCloseSidebar={handleCloseSidebar}
        />
      </div>
      <div className={sidebarClasses}>
        <div className="flex flex-col gap-2">
          <HomeButton />
          <div className="flex justify-end">
            <MenuButton
              handleOpenSidebar={handleOpenSidebar}
              iconStyle={iconStyle}
              isSidebarOpen={isSidebarOpen}
              handleCloseSidebar={handleCloseSidebar}
            />
          </div>

          <Link
            to="/generator"
            className={`${iconStyle} mb-4 text-text ${
              isSidebarOpen ? "justify-between" : "justify-center"
            }`}
            aria-label="go to Content Idea Generator page"
          >
            {isSidebarOpen ? "Content Idea Generator" : ""}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              color="currentColor"
            >
              <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
            </svg>
          </Link>
          {generatedArticles.map((article, index) => (
            <button
              key={index}
              onClick={() => handleSelectedId(index)}
              className={`${iconStyle} relative overflow-hidden text-xs text-gray-600 ${
                isSidebarOpen ? "" : "hidden"
              } ${index === selectedId ? "bg-elementBg" : ""}`}
            >
              <span className="truncate">{article[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

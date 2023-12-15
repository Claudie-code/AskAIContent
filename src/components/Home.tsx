import React from "react";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="m-auto flex max-w-4xl flex-col gap-8 pt-20 lg:gap-16">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-caption bg-gradient-to-r from-cyan-400 to-cyan-900 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
          AskAIContent
        </h1>
        <h2 className="max-w-xl text-2xl font-thin">
          Explore our unique AI-powered tool, which inspires you and generates
          tailor-made content ideas to boost your creativity.
        </h2>
        <a
          href="/generator"
          className="mt-4 inline-block rounded-md border border-border bg-elementBg px-12 py-3 text-sm font-medium text-text 
            transition-all hover:border-hoveredBorder hover:bg-hoveredElementBg focus:outline-none focus:ring active:bg-activeElementBg"
        >
          Get started
        </a>
      </div>
    </div>
  );
};

export default Home;

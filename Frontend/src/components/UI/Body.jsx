import React, { useState } from "react";

const Body = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <scrollbars className="p-5 w-screen min-h-screen text-black flex  gap-3 flex-wrap ">
      <div className=" w-96 h-96 group  [perspective:1000px]">
        <div className={`relative   bg-white w-full h-full rounded  transition-all duration-700
         shadow-lg shadow-black [transform-style:preserve-3d] ${isFlipped ?" rotate-y-180": "" }`}
         onClick={handleFlip}
         >
          <div className=" absolute inset-0 flex w-full h-full items-center justify-center [backface-visibility:hidden] ">
            Hi
          </div>
          <div className=" absolute inset-0 flex w-full h-full items-center justify-center  [transform:rotateY(180deg)]
            [backface-visibility:hidden] ">
        Bye
          </div>
        </div>
      </div>
     
    
    </scrollbars>
  );
};

export default Body;

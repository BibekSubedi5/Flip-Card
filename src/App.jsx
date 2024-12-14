import React from "react";
import Body from "./UI/Body";
import Header from "./UI/Header";
import Sidebar from "./UI/Sidebar";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Header stays at the top */}
      
      <div className="flex flex-1">
        <Sidebar /> 
        <Body /> {/* Body takes the remaining space */}
      </div>
    </div>
  );
};

export default App;

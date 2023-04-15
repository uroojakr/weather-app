import React from "react";
import Dropdown from "./components/dropDowns";
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Weather DropDowns</h1>
      </header>
      <div className="App-body">
        <Dropdown />
      </div>
    </div>
  );
}

export default App;

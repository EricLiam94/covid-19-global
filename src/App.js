import React from "react";
import "./App.css";

import Maps from "./Components/Maps/Maps";
import Charts from "./Components/Charts/Charts";
import Controller from "./Components/Controller/Controller";
import Guide from "./Components/Guide/Guide";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Global Covid-19 </h3>
        <Maps />
        <Controller />
        <Charts />
        <Guide />
      </header>
      <footer>
        {" "}
        Data retrieved from{" "}
        <a href=" https://github.com/CSSEGISandData/COVID-19"> Here </a>
      </footer>
    </div>
  );
}

export default App;

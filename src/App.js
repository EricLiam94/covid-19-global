import React from "react";
import "./App.css";

import Maps from "./Components/Maps/Maps";
import Charts from "./Components/Charts/Charts";
import Controller from "./Components/Controller/Controller";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3> Global Covid-19 </h3>
        <Maps />
        <Controller />
        <Charts />
      </header>
      <footer>
        {" "}
        Data retrieved from <a> https://github.com/CSSEGISandData/COVID-19 </a>
      </footer>
    </div>
  );
}

export default App;

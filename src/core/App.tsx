import React from "react";
import NearEarthWatcher from "../view/NearEarthWatcher";
import VSeparator from "../view/shared/VSeparator";

function App() {
  return (
    <div>
      <header>
        <h1>Project Astrolog | be excellent.</h1>
      </header>
      <NearEarthWatcher />
      <VSeparator height="5rem" />
    </div>
  );
}

export default App;

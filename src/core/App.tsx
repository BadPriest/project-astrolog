import React from "react";
import { ThemeProvider } from "styled-components";
import NearEarthWatcher from "../view/NearEarthWatcher";
import { Theme } from "./theme";
import ViewTemplate from "./ViewTemplate";

function App() {
  return (
    <div>
      <ThemeProvider theme={Theme}>
        <ViewTemplate>
          <NearEarthWatcher />
        </ViewTemplate>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./theme";

import ViewTemplate from "../view/ViewTemplate";
import NearEarthWatcher from "../view/NearEarthWatcher";

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

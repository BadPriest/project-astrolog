import React, { SyntheticEvent, useState } from "react";
import VSeparator from "../shared/VSeparator";
import { WrapperSearchControls, WrapperInput } from "./styles";

interface SearchInterval {
  initialDate?: string;
  finalDate?: string;
}

function NearEarthWatcher() {
  const [searchInterval, setSearchInterval] = useState<SearchInterval>();

  const handleInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = { ...event };

    const newState: SearchInterval = {
      ...searchInterval,
      [`${target.name}`]: target.value,
    };

    setSearchInterval(newState);
  };

  const handleClicked = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("clicked search =]");
    console.log("searchInterval", searchInterval);
  };

  return (
    <>
      <h2>Near Earth Watcher</h2>
      <VSeparator height=".5rem" />
      <WrapperSearchControls>
        <WrapperInput>
          <label htmlFor="initialDateInput">Initial Date</label>
          <input
            type="text"
            placeholder="Input the initial date"
            name="initialDateInput"
            id="initialDateInput"
            value={searchInterval?.initialDate}
            onChange={handleInputChanged}
          />
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="finalDateInput">Final Date</label>
          <input
            type="text"
            placeholder="Input the final date"
            name="finalDateInput"
            id="finalDateInput"
            value={searchInterval?.finalDate}
            onChange={handleInputChanged}
          />
        </WrapperInput>
        <button type="submit" onClick={handleClicked}>
          search
        </button>
      </WrapperSearchControls>
      <VSeparator height="2rem" />
    </>
  );
}

export default NearEarthWatcher;

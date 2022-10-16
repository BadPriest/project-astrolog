import React, { SyntheticEvent, useState } from "react";
import { ENDPOINTS, API_KEY, getFullApiUrl } from "../../core/api/endpoints";
import VSeparator from "../shared/VSeparator";
import { WrapperSearchControls, WrapperInput, WrapperResults } from "./styles";

interface SearchInterval {
  initialDate?: string;
  finalDate?: string;
}

function NearEarthWatcher() {
  const [searchInterval, setSearchInterval] = useState<SearchInterval>();
  const [searchResults, setSearchResults] = useState();

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
    fetchData(searchInterval || {});
  };

  const fetchData = async (interval: SearchInterval) => {
    const url = getFullApiUrl(ENDPOINTS.LIST);

    url.searchParams.append("start_date", interval?.initialDate || "");
    url.searchParams.append("end_date", interval?.finalDate || "");
    url.searchParams.append("api_key", API_KEY || "");

    const response = (await fetch(url)) as Response;

    if (!response.ok) {
      throw new Error("[exception] bad outcome =[");
    }

    const data = await response.json();
    setSearchResults(data);
  };

  return (
    <>
      <h2>Near Earth Watcher</h2>
      <VSeparator height=".5rem" />
      <WrapperSearchControls>
        <WrapperInput>
          <label htmlFor="initialDate">Initial Date</label>
          <input
            type="text"
            placeholder="Input the initial date"
            name="initialDate"
            id="initialDate"
            onChange={handleInputChanged}
          />
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="finalDate">Final Date</label>
          <input
            type="text"
            placeholder="Input the final date"
            name="finalDate"
            id="finalDate"
            onChange={handleInputChanged}
          />
        </WrapperInput>
        <button type="submit" onClick={handleClicked}>
          search
        </button>
      </WrapperSearchControls>
      <VSeparator />
      <WrapperResults>{JSON.stringify(searchResults)}</WrapperResults>
    </>
  );
}

export default NearEarthWatcher;

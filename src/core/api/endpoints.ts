export const ENDPOINTS = {
  LIST: "feed/",
  LOOKUP: "neo/",
};

export const API_KEY = process.env.REACT_APP_API_KEY;

// Builds API with given endpoint or just returns the base API URL
export const getFullApiUrl = (endpoint: string) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return new URL(`${apiUrl}${endpoint || ""}`);
};

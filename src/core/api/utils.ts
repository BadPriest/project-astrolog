import { API_KEY, API_URL } from "./constants";

export interface makeURLOptions {
  endpoint: string;
  params: Map<string, string>;
}

// Builds API with given endpoint and params or just returns the base API URL
export const makeURL = (options: makeURLOptions) => {
  const { endpoint, params } = options;
  const url = new URL(`${API_URL}${endpoint || ""}`);

  if (params?.size) {
    params.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  url.searchParams.append("api_key", API_KEY || "");

  return url;
};

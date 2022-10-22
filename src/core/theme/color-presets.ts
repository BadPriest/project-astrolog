interface colorPreset {
  background: string;
  text: string;
  interactive: {
    surface: string;
    surfaceActive: string;
    text: string;
    textActive: string;
  };
  muted: {
    surface: string;
    surfaceActive: string;
    text: string;
    textActive: string;
  };
  accent: string;
  success: string;
  warning: string;
  danger: string;
}

export const main: colorPreset = {
  background: "#272727",
  text: "#E7E7E7",
  interactive: {
    surface: "#424242",
    surfaceActive: "#E7E7E7",
    text: "#E7E7E7",
    textActive: "#272727",
  },
  muted: {
    surface: "#5B5B5B",
    surfaceActive: "#E7E7E7",
    text: "#E7E7E766",
    textActive: "#272727",
  },
  accent: "#FFDC94",
  success: "",
  warning: "",
  danger: "#ff3a5e",
};

export default main;

interface colorPreset {
  background: string;
  text: string;
  interactiveElements: {
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
  interactiveElements: {
    surface: "#424242",
    surfaceActive: "#E7E7E7",
    text: "#E7E7E7",
    textActive: "#272727",
  },
  accent: "#FFDC94",
  success: "",
  warning: "",
  danger: "",
};

export default main;

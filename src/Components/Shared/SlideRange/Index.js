import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { createTheme, ThemeProvider } from "@mui/material";

const themeSlider = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: `vazir, "Roboto", "Arial"`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 500,
    fontWeightHeavy: 700,
    fontWeightFat: 900,
  },
  palette: {
    secondary: {
      main: "#8b5cf6",
      contrastText: "#fff",
    },
  },
});

const Index = ({handleChange,value}) => {

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeProvider theme={themeSlider}>
        <Slider
          getAriaLabel={() => "Minimum distance"}
          value={value}
          onChange={handleChange}
          max={60}
          min={18}
          valueLabelDisplay="on"
          //   getAriaValueText={"valuetext"}
          //   valueLabelDisplay="on"
          disableSwap
          color="secondary"
          sx={{
            "& .MuiSlider-valueLabel": { bottom: "-3.5rem", top: "initial", fontSize: "10px" },
            "& .MuiSlider-valueLabel:before": { top: "-8px", bottom: "initial" },
          }}
        />
      </ThemeProvider>
    </Box>
  );
};

export default Index;

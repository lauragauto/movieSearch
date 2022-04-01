import React from "react";
import ReactDOM from "react-dom";
import { Paths } from "./routes";
import { StyledEngineProvider } from '@mui/material/styles';
import "./styles.scss";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {" "}
      <Paths />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

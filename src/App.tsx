import React from "react";
import Chat from "./components/Chat";
import { CssBaseline, Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <Container>
      <CssBaseline />
      <Chat />
    </Container>
  );
};

export default App;

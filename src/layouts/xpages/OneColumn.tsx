import React from "react";
import { BrComponent } from "@bloomreach/react-sdk";
import { Container } from "@mui/material";

export const OneColumn = () => {
  return (
    <main data-page-layout="one-column">
      <BrComponent path="main">
        <Container maxWidth={false} disableGutters>
          <BrComponent />
        </Container>
      </BrComponent>
    </main>
  )
}

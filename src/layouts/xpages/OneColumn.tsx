import React from "react";
import { BrComponent } from "@bloomreach/react-sdk";
import { Container, Grid } from "@mui/material";

export const OneColumn = () => {
  return (
    <main data-page-layout="one-column">
      <BrComponent path="top">
        <Container maxWidth={false} disableGutters>
          <BrComponent />
        </Container>
      </BrComponent>
      <Container maxWidth={false} disableGutters>
        <Grid container>
          <BrComponent path="main">
            <Grid item xs={12}>
              <BrComponent />
            </Grid>
          </BrComponent>
        </Grid>
      </Container>
      <BrComponent path="bottom">
        <Container maxWidth={false} disableGutters>
          <BrComponent />
        </Container>
      </BrComponent>
    </main>
  )
}

import React from "react";
import { BrComponent } from "@bloomreach/react-sdk";
import { Container, Grid } from "@mui/material";

export const TwoColumn = ({ layout }: { layout?: string }) => {
  return (
    <main data-page-layout="two-column">
      <BrComponent path="top">
        <Container maxWidth={false} disableGutters>
          <BrComponent />
        </Container>
      </BrComponent>
      <Container>
        <Grid
          container
        >
          <BrComponent path="main">
            <Grid item xs={12} md={6}>
              <BrComponent />
            </Grid>
          </BrComponent>
          <BrComponent path="right">
            <Grid item xs={12} md={6}>
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

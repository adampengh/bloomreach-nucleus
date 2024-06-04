import { BrComponent } from "@bloomreach/react-sdk";
import { Container, Grid, Typography } from "@mui/material";

import { HelpCenterMenu } from "@/components/HelpCenterMenu";

export const HelpCenterAbstractLayout = ({
  children,
}: any) => {
  return (
    <main data-page-layout="help-center">
      <Typography
        variant="h3"
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          padding: '1rem 0',
        }}>
        Help Center
      </Typography>
      <BrComponent path="top">
        <Container maxWidth={false} disableGutters>
          <BrComponent />
        </Container>
      </BrComponent>
      <Container maxWidth={'xl'}>
        <Grid container spacing={3}>
          {children}
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

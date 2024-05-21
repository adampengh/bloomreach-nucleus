import { BrComponent } from "@bloomreach/react-sdk"
import { Container } from "@mui/material"

export const ProductListingAbstractLayout = ({
  children,
}: any) => {
  return (
    <section data-page-layout="plp-level-one">
      <Container maxWidth={false} disableGutters>
        <BrComponent path="plp-top-shared" />
      </Container>
      {children}
      <Container maxWidth={false} disableGutters>
        <BrComponent path="plp-bottom-shared" />
      </Container>
    </section>
  )
}

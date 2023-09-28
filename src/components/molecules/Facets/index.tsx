import React from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const Facets = ({ facetResult }: any) => {
  // console.log('Facets', facetResult)
  return (
    <Grid container spacing={0}>
      {facetResult?.fields?.map((facet: any, index: number) => (
        <Grid key={index} item xs={12} sx={{ pr: 6 }}>
          <FacetGroup facet={facet} index={index} />
        </Grid>
      ))}
    </Grid>
  )
}

const FacetGroup = ({ facet, index }: any) => {
  if (!facet) return null
  // console.log('facet', facet)

  const { name, values } = facet

  return (
    <FormGroup>
      <Accordion
        defaultExpanded={index < 3 ? true : false}
        disableGutters
        square
        sx={{
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='caption' sx={{ fontWeight: 700 }}>{name.replace('_', ' ')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={0}>
            {values?.filter((value: any, index: number) => index < 6)
              .map((value: any, index: number) => (
                <FormControlLabel key={index} control={<Checkbox size='small' />}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      width: '100%',
                      alignItems: 'center',
                      alignContent: 'center',
                    }
                  }}
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant='body2' sx={{ lineHeight: 1 }}>{value.name}</Typography>
                      <Chip label={value.count} size="small" variant="outlined" color='primary' />
                    </Box>
                  }
                />
            ))}
            <Link>More</Link>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </FormGroup>
  )
}

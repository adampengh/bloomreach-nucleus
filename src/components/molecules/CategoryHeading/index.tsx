// import { CommerceContext } from '../../../context/CommerceContext'
import { useCategory } from '@bloomreach/connector-components-react'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useContext } from 'react'
import { useCookies } from 'react-cookie'

export const CategoryHeading = ({ categoryId }: any) => {
  // console.log('CategoryHeading', categoryId)

  // const {
  //   discoveryDomainKey,
  //   discoveryConnector,
  //   discoveryAccountId,
  // } = useContext(CommerceContext);
  // console.log('discoveryDomainKey', discoveryDomainKey)
  // console.log('discoveryConnector', discoveryConnector)
  // console.log('discoveryAccountId', discoveryAccountId)

  const [cookies] = useCookies(['_br_uid_2']);

  // console.log('categoryId', categoryId)

  // const [category, loading, error] = useCategory({
  //   categoryId,
  //   connector: discoveryConnector,
  //   discoveryAccountId,
  //   discoveryDomainKey,
  //   brUid2: cookies._br_uid_2,
  // });

  // if (loading) {
  //   return null
  // }
  // if (error) {
  //   console.error('error', error)
  //   return null
  // }

  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Grid item xs={12}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href="/">
            <Typography variant='caption'>Home</Typography>
          </Link>

          <Typography color="text.primary" variant='caption'>displayName</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" align='center' component='h1'>
          displayName
        </Typography>
      </Grid>
    </>
  )
}

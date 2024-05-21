import { useContext, useMemo, useState } from 'react';
import { ClickAwayListener, Typography } from '@mui/material';
import { CommerceContext } from '@/context/CommerceContext';
import { useCookies } from 'react-cookie';
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react';

import { StyledShoppableImageDetails, StyledShoppableImageDetailsContent, StyledShoppableImageDetailsImage, StyledShoppableImageIndicator, StyledShoppableImageLink, StyledShoppableImagePopoverContainer, StyledShoppableImageTriangle } from './styles';

export const ShoppableImagePopover = ({ product }: any): React.ReactElement | null => {
  const {
    productId,
    top,
    left,
  } = product;

  const [showPopover, setShowPopover] = useState(false);

  const {
    discoveryAccountId,
    discoveryAuthKey,
    discoveryConnector,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    discoveryDomainKey,
    discoveryViewId,
    brEnvType,
  } = useContext(CommerceContext);

  const [cookies] = useCookies(['_br_uid_2']);

  const params: ProductDetailInputProps = useMemo(
    () => ({
      itemId: productId,
      brUid2: cookies._br_uid_2,
      connector: discoveryConnector,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    }),
    [
      cookies._br_uid_2,
      productId,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryConnector,
      discoveryCustomAttrFields,
      discoveryCustomVarAttrFields,
      discoveryCustomVarListPriceField,
      discoveryCustomVarPurchasePriceField,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    ],
  );

  const [item, loading, error] = useProductDetail(params);

  if (error) {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={() => setShowPopover(false)}>
      <StyledShoppableImagePopoverContainer
        style={{
          top: `${top}%`,
          left: `${left}%`,
        }}
      >
        <StyledShoppableImageIndicator
          onClick={() => setShowPopover(true)}
        />
        <StyledShoppableImageDetails
          style={{ display: showPopover ? 'flex' : 'none' }}
        >
          <StyledShoppableImageTriangle>▲</StyledShoppableImageTriangle>
          <StyledShoppableImageLink
            href={`/p/${productId}`}
            underline='none'
          >
            <StyledShoppableImageDetailsImage>
              { item && <img src={item?.imageSet?.original?.link?.href || ''} alt='placeholder' /> }
            </StyledShoppableImageDetailsImage>
            <StyledShoppableImageDetailsContent>
              <Typography variant='body1'>
                { item?.displayName }
              </Typography>
              <Typography variant='body1' sx={{ mt: 1 }}>
                ${ item?.purchasePrice?.moneyAmounts?.[0]?.amount}
              </Typography>
            </StyledShoppableImageDetailsContent>
          </StyledShoppableImageLink>
        </StyledShoppableImageDetails>
      </StyledShoppableImagePopoverContainer>
    </ClickAwayListener>
  )
}

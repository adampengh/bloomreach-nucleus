import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Page } from '@bloomreach/spa-sdk';
// import { getCookieConsentValue } from 'react-cookie-consent';

export interface BrPixelProps {
  accountId: string;
  domainKey: string;
  page: Page;
  pageType?: string;
  pageLabels?: string;
  type?: string;
}

export function BrPixel(props: BrPixelProps): React.ReactElement | null {
  // eslint-disable-next-line prefer-destructuring
  const setCookie = useCookies(['_br_uid_2'])[1];
  useEffect(() => {
    if (/^\d+$/.test(props.accountId)) {
      (window as any).br_data = {
        page_type: `${props.pageType ?? ''}`,
        page_labels: `${props.pageLabels ?? ''}`,
        acct_id: `${props.accountId}`,
        type: `${props.type ?? ''}`,
      };

      if (props.domainKey && props.domainKey.trim() !== '') {
        (window as any).br_data.domain_key = `${props.domainKey}`;
      }

      // if (getCookieConsentValue() === 'true') {
        const brtrk = document.createElement('script');
        brtrk.type = 'text/javascript';
        brtrk.async = true;
        brtrk.src = `//cdns.brsrvr.com/v1/br-trk-${props.accountId}.js`;
        // Update react cookie with the latest value
        brtrk.addEventListener('load', () => {
          const brUid2 = document.cookie
            .split('; ')
            .find((cookie) => cookie.trim().startsWith('_br_uid_2='))
            ?.split('=')[1];
          setCookie('_br_uid_2', brUid2, { path: '/' });
        });
        // eslint-disable-next-line prefer-destructuring
        const s = document.getElementsByTagName('script')[0];
        s.parentNode?.insertBefore(brtrk, s);
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

import React, { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'

import { Button } from '@mui/material';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';


export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false)
  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

  function scrollToTop() {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { scrollYProgress } = useScroll();
  useEffect(() => {
    return scrollYProgress.on('change', (latestValue) => {
      (latestValue > 0.1) ? setShow(true) : setShow(false)
    });
  });

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={scrollToTop}
      disableElevation={false}
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        height: 48,
        width: 48,
        borderRadius: 36,
        padding: '6px',
        minWidth: '36px',
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? 1 : 0,
        transition: 'all 0.5s ease',
      }}
    >
      <VerticalAlignTopIcon fontSize="small" />
    </Button>
  )
}

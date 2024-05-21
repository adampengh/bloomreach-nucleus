import React from "react";
import Image from "next/image";
import { BrProps } from "@bloomreach/react-sdk";
import { ImageSet } from "@bloomreach/spa-sdk";
import { Link } from "@mui/material";

interface LogoComponentProps {
  height?: number;
  width?: number;
}

export const Logo = ({ component, page }: BrProps) => {
  if (!component || !page) return null;

  // Component parameters
  const {
    height = 32,
    width = 200,
  } = component?.getParameters<LogoComponentProps>() || {};
  // console.log('height', height)
  // console.log(component?.getModels<any>())
  const { logo: logoRef } = component?.getModels<any>() || {};

  if (!logoRef) {
    return page?.isPreview() ? <div style={{ display: 'block', width: '100%' }} /> : null;
  };
  const logo = logoRef && page?.getContent<ImageSet>(logoRef)?.getOriginal();
  // console.log('logo', logo)

  return (
    <>
      {logo && (
        <Link href="/" display={'flex'} alignItems={'center'}>
          <Image
            src={logo.getUrl()}
            alt="Bloomreach Logo"
            width={width}
            height={height}
          />
        </Link>
      )}
    </>
  )
}

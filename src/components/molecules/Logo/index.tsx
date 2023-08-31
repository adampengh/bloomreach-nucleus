import Image from "next/image";
import React from "react";

export const Logo = () => {
  return (
    <Image
      src="/assets/images/bloomreach-logo-dark.svg"
      alt="Bloomreach Logo"
      width={200}
      height={32}
    />
  )
}

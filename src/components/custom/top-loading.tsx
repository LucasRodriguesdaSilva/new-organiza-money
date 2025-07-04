"use client";

import NextTopLoader from 'nextjs-toploader';

export function TopLoading() {
  return (
    <NextTopLoader
      color="black"
      height={4}
      showSpinner={false}
      shadow={`0 0 10px black, 0 0 5px black`}
    />
  );
}
"use client";
import { PropsWithChildren, useState, useEffect } from 'react';

export default function ClientOnly({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])
  
  if (!mounted) return null;
  return (
    <>
      {children}
    </>
  )
}
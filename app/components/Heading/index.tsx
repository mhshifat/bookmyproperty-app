"use client";
import { ReactElement } from 'react';

interface HeadingProps {
  title: ReactElement | string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <p className={`text-2xl font-bold flex items-center ${center ? 'justify-center' : 'justify-start'}`}>
        {title}
      </p>
      <p className="font-light text-neutral-500 mt-2">
        {subtitle}
      </p>
    </div>
  )
}
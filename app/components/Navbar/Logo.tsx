'use client';

import { useRouter } from "next/navigation";

export default function Logo() {
  const router = useRouter();

  return (
    <span onClick={() => router.push('/')} className="cursor-pointer hidden md:block text-xl font-bold tracking-[-1px]">Book<em className="text-rose-500 font-bold text-2xl tracking-[-3px]">MY</em>Property</span>
  )
}
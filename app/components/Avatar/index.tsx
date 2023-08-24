"use client";
import Image from "next/image";

export default function Avatar() {
  return (
    <Image
      className="rounded-full"
      height={20}
      width={20}
      alt="Avatar"
      src='https://picsum.photos/200'
    />
  )
}
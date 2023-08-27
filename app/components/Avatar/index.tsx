"use client";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
}

export default function Avatar({ src }: AvatarProps) {
  return (
    <Image
      className="rounded-full"
      height={20}
      width={20}
      alt="Avatar"
      src={src ?? 'https://picsum.photos/200'}
    />
  )
}
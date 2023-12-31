"use client";
import { MouseEvent, PropsWithChildren } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export default function Button({ onClick, disabled, outline, icon: Icon, small, children }: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white' : 'bg-rose-500'} ${outline ? 'border-black' : 'border-rose-500'} ${outline ? 'bg-black' : 'text-white'} ${small ? 'py-1' : 'py-3'} ${small ? 'text-sm' : 'text-base'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border-[1px]' : 'border-2'}`}>
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {children}
    </button>
  )
}
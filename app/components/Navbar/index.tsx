'use client';
import { User } from "@prisma/client";
import { Container } from "..";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

export interface UserState {
  currentUser?: User | null;
}

export default function Navbar({ currentUser }: UserState) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-2">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}
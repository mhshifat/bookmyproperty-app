'use client';
import { Container } from "..";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-2">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  )
}
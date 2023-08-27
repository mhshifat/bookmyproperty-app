"use client";
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar } from '..';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { useLoginModal, useRegisterModal } from '@/app/hooks';
import { UserState } from '.';
import { signOut } from 'next-auth/react';

export default function UserMenu({ currentUser }: UserState) {
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, [])

	return (
		<div className="relative">
			<div className="flex items-center gap-3">
				<div
					className="hidden md:block  text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={() => {}}
				>
					Rent your home
				</div>
				<div
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
					onClick={toggleOpen}
				>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
			</div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser?.id ? (
              <>
                <MenuItem
                  label='My trips'
                  onClick={() => {}}
                />
                <MenuItem
                  label='My favorites'
                  onClick={() => {}}
                />
                <MenuItem
                  label='My reservations'
                  onClick={() => {}}
                />
                <MenuItem
                  label='My properties'
                  onClick={() => {}}
                />
                <MenuItem
                  label='Rent my home'
                  onClick={() => {}}
                />
                <hr />
                <MenuItem
                  label='Logout'
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label='Login'
                  onClick={() => loginModal.onOpen()}
                />
                <MenuItem
                  label='Sign up'
                  onClick={() => registerModal.onOpen()}
                />
              </>
            )}
          </div>
        </div>
      )}
		</div>
	);
}

"use client";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useLoginModal, useRegisterModal } from '@/app/hooks';
import Modal from '.';
import { Button, Heading, Input } from '..';
import Logo from '../Navbar/Logo';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }
      
      if (callback?.error) {
        toast.error(callback.error);
      }
    })
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={(
        <div className='flex flex-col gap-4'>
          <Heading
            title={<>Welcome back to&nbsp;<Logo /></>}
            subtitle='Login to your account!'
          />
          <Input
            id='email'
            label='Email'
            type='email'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id='password'
            type='password'
            label='Password'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )}
      footer={(
        <div className='flex flex-col gap-4 mt-3'>
          <hr />
          <Button outline icon={FcGoogle} onClick={() => signIn('google')}>Continue with Google</Button>
          <Button outline icon={AiFillGithub} onClick={() => signIn('github')}>Continue with Github</Button>
          <div className='text-neutral-500 text-center mt-4 font-light'>
            <div className='flex items-center gap-2 justify-center'>
              <div>
                First time using BookMyProperty?
              </div>
              <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                Create an account?
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}
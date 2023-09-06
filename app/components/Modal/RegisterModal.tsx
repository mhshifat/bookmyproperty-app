"use client";
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoginModal, useRegisterModal } from '@/app/hooks';
import Modal from '.';
import { Button, Heading, Input } from '..';
import Logo from '../Navbar/Logo';
import { signIn } from 'next-auth/react';

export default function RegisterModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const { register, reset, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });
  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/register', data)
      .then(() => {
        toast.success("Success!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((err) => {
        toast.error(err?.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={(
        <div className='flex flex-col gap-4'>
          <Heading
            title={<>Welcome to&nbsp;<Logo /></>}
            subtitle='Create an account!'
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
            id='name'
            label='Name'
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
                Already have an account?
              </div>
              <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
                Log in
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}
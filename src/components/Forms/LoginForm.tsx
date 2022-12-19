import { signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IEmployee } from 'types';

import { auth } from '@/lib/firebaseConfig';

interface UserProps {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm = (props: UserProps) => {
  const methods = useForm<IEmployee>({ mode: 'onTouched' });
  const { register, handleSubmit } = methods;
  const [failedAuth, setFailedAuth] = React.useState<string>();

  const { setUser } = props;

  const onSubmit: SubmitHandler<IEmployee> = async (data) => {
    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user?.email as string);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          setFailedAuth('Invalid Username or Password!');
        } else {
          setFailedAuth('Invalid Username or Password!');
        }
      });
  };

  return (
    <div className='z-10 mx-auto w-full max-w-md space-y-8 rounded-xl bg-white p-10'>
      <div className='text-center'>
        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome Back!</h2>
        {!failedAuth ? (
          <p className='mt-2 text-sm text-gray-600'>
            Please sign in to your account
          </p>
        ) : (
          <p className='my-5 mb-6 rounded-md border border-red-300 bg-red-50 p-3 text-center font-medium text-red-500'>
            {failedAuth}
          </p>
        )}
      </div>

      <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <label className='text-sm font-bold tracking-wide text-gray-700'>
            Email
          </label>
          <input
            className=' w-full border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none'
            type=''
            required={true}
            placeholder='mail@gmail.com'
            {...register('email')}
          />
        </div>
        <div className='mt-8 content-center'>
          <label className='text-sm font-bold tracking-wide text-gray-700'>
            Password
          </label>
          <input
            className='w-full content-center border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none'
            type=''
            required={true}
            {...register('password')}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <input
            type='submit'
            className='focus:shadow-outline flex w-full cursor-pointer justify-center rounded-full bg-indigo-500 p-4
                                font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none hover:bg-indigo-600'
          />
        </div>
        <p className='text-md mt-10 flex flex-col items-center justify-center text-center text-gray-500'>
          <span>Forgot Password?</span>
          <a
            href='mailto:webworksdreams@gmail.com'
            className='hover:text-indigo-500no-underline cursor-pointer text-indigo-500 transition duration-300 ease-in hover:underline'
          >
            Email admin
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

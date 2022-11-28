import * as React from 'react';
// import { useForm } from 'react-hook-form';
// import { IEmployee } from 'types';

const LoginForm = () => {
  // const methods = useForm<IEmployee>({ mode: 'onTouched' });
  // const { register, handleSubmit } = methods;

  // const onSubmit: SubmitHandler<IEmployee> = async (data) => {
  //   // Sets form data into Firestore

  //   // const {
  //   //   email,
  //   //   password,
  //   // } = data;

  //   // const response = await fetch('/api/employees/', {
  //   //   body: JSON.stringify({
  //   //     email,
  //   //     password,
  //   //   }),
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //   },
  //   // })

  //   // const content = await response.json();

  //   // setUserEmail(data)
  // };

  return (
    <div className='z-10 w-full max-w-md space-y-8 rounded-xl bg-white p-10'>
      <div className='text-center'>
        <h2 className='mt-6 text-3xl font-bold text-gray-900'>Welcome Back!</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Please sign in to your account
        </p>
      </div>

      {/* <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <div className='absolute right-0 mt-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-green-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </div>
          <label className='text-sm font-bold tracking-wide text-gray-700'>
            Email
          </label>
          <input
            className=' w-full border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none'
            type=''
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
            {...register('password')}
            placeholder='Enter your password'
          />
        </div>
        <div>
          <input
            type='submit'
            className='focus:shadow-outline flex w-full cursor-pointer justify-center rounded-full  bg-indigo-500 p-4
                                font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in focus:outline-none hover:bg-indigo-600'
          />
        </div>
        <p className='text-md mt-10 flex flex-col items-center justify-center text-center text-gray-500'>
          <span>Don't have an account?</span>
          <a
            href='#'
            className='hover:text-indigo-500no-underline cursor-pointer text-indigo-500 transition duration-300 ease-in hover:underline'
          >
            Sign up
          </a>
        </p>
      </form> */}
    </div>
  );
};

export default LoginForm;

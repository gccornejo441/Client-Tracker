import { useRouter } from 'next/router';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProject } from 'types';

const SearchClient = () => {
  const { register, handleSubmit } = useForm<IProject>();

  const intialValues = { client: '' };

  const router = useRouter();

  // Sets form data into Firestore
  const onSubmit: SubmitHandler<IProject> = async (data) => {
    const { client } = data;

    fetch(`/api/dailyEvents/${client}`, {
      method: 'POST',
      body: JSON.stringify({
        client,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok)
        router.push({
          pathname: '/[id]/',
          query: { id: client },
        });
    });
  };

  return (
    <>
      <div className='mt-10 flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col text-center'>
            <label htmlFor='client' className='my-5 text-xl font-semibold'>
              Please enter the client full name
            </label>
            <input
              type='text'
              className='group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pl-4 md:pr-3.5 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 dark:md:bg-slate-800/75 dark:md:ring-inset dark:md:ring-white/5 dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500 lg:w-96'
              defaultValue={intialValues.client}
              {...register('client')}
            />
          </div>
          <div className='mx-auto my-10 flex justify-center text-center'>
            <input
              value='Submit'
              type='submit'
              className='mt-4 w-1/2 cursor-pointer rounded bg-indigo-700 px-6 py-3 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:mt-0'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchClient;

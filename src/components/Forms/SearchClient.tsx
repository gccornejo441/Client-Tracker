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

    const clientNameToLowerCase = client.toString().toLocaleLowerCase();

    fetch(`/api/dailyEvents/${clientNameToLowerCase}`, {
      method: 'POST',
      body: JSON.stringify({
        client: clientNameToLowerCase,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok)
        router.push({
          pathname: '/[id]/',
          query: { id: clientNameToLowerCase },
        });
    });
  };

  return (
    <>
      <div className='mt-10 flex justify-center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col text-center'>
            <label htmlFor='client' className='my-5 text-xl font-semibold'>
              Please search by the client full name
            </label>
            <input
              type='text'
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              defaultValue={intialValues.client}
              {...register('client')}
            />
          </div>
          <div className='mx-auto my-10 flex justify-center text-center'>
            <input
              value='Search'
              type='submit'
              className='mt-4 w-1/2 cursor-pointer rounded bg-indigo-700 px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 hover:bg-indigo-600 sm:mt-0'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchClient;

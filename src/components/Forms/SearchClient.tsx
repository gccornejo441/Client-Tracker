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
            <label htmlFor='client'>Please enter the client name</label>
            <input
              type='text'
              defaultValue={intialValues.client}
              {...register('client')}
            />
          </div>
          <div className='mx-auto flex flex-col text-center'>
            <input
              value='Submit'
              type='submit'
              className='my-3 w-[70px] border-2 border-green-400 bg-green-200 px-2'
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchClient;

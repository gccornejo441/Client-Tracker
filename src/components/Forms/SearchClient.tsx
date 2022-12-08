import { useRouter } from 'next/router';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { IProject } from 'types';

import clsxm from '@/lib/clsxm';

const SearchClient = () => {
  const { register, handleSubmit } = useForm<IProject>();
  const [DNE, setDNE] = React.useState(null);

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
      if (res.ok) {
        router.push({
          pathname: '/[id]/',
          query: { id: clientNameToLowerCase },
        });
      } else {
        res.json().then((result) => {
          setDNE(result);
        });
      }
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

            {DNE && (
              <div className='relative my-5 rounded border border-red-400 bg-red-100 px-4 py-3 font-semibold text-red-500'>
                <span className='absolute right-2 top-2'>
                  <AiOutlineClose
                    size={16}
                    className='cursor-pointer text-red-500'
                    onClick={() => setDNE(null)}
                  />
                </span>
                <p>{DNE}</p>
              </div>
            )}

            <input
              type='text'
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              defaultValue={intialValues.client}
              required
              {...register('client')}
            />
          </div>
          <div className='mx-auto my-10 flex justify-center text-center'>
            <input
              value='Search'
              type='submit'
              className={clsxm(
                'm-2 cursor-pointer items-center rounded px-10 py-2 font-medium',
                'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
                'shadow-sm',
                'transition-colors duration-75',
                'bg-indigo-500 text-white',
                'border border-indigo-600',
                'hover:bg-indigo-600 hover:text-white',
                'active:bg-indigo-500',
                'disabled:bg-indigo-400 disabled:hover:bg-indigo-400'
              )}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchClient;

import { useRouter } from 'next/router';
import * as React from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import 'react-datepicker/dist/react-datepicker.css';

import { IClose, IEvents } from '../../../types';

export const EmailForm = ({ closeModal }: IClose) => {
  const { register, handleSubmit, control } = useForm<IEvents>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IEvents> = (data) => {
    // Sets form data into Firestore

    const { eventName, eventMemo, eventStart, eventEnd, eventAction } = data;

    fetch('/api/dailyEvents/', {
      body: JSON.stringify({
        eventName,
        eventMemo,
        eventStart,
        eventEnd,
        eventAction,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.reload();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mt-2'>
        <div>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='eventName'
          >
            Event Name
          </label>
          <input
            className='focus:shadow-outline mb-3 w-full appearance-none rounded border border-red-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
            id='password'
            type='text'
            {...register('eventName')}
            placeholder="John's kickback"
          />
        </div>
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='eventMemo'
          >
            Memo
          </label>
          <textarea
            className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
            id='eventMemo'
            {...register('eventMemo')}
            placeholder='Remember to bring a six pack of IPAs.'
          />
        </div>
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='eventStart'
          >
            Event Start
          </label>
          <Controller
            control={control}
            name='eventStart'
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </div>
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='eventEnd'
          >
            Event End
          </label>
          <Controller
            control={control}
            name='eventStart'
            render={({ field: { onChange, onBlur, value } }) => (
              <ReactDatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
              />
            )}
          />
        </div>
        <div className='mb-4'>
          <label
            className='mb-2 block text-sm font-bold text-gray-700'
            htmlFor='eventAction'
          >
            Event Action
          </label>
          <input
            className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
            id='eventAction'
            {...register('eventAction')}
            type='text'
            placeholder='Add an action'
          />
        </div>
      </div>

      <input
        className='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        type='submit'
        onClick={closeModal}
      />
    </form>
  );
};

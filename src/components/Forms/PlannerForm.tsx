import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import DatePicker from '@/components/Forms/DatePicker';

import { IClose, IProject } from '../../../types';

export const EmailForm = ({ closeModal }: IClose) => {
  const methods = useForm<IProject>({ mode: 'onTouched' });
  const { register, handleSubmit } = methods;

  const router = useRouter();

  type Option = {
    label: React.ReactNode;
    value: string | number | string[];
  };

  type SelectProps = React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & { options: Option[] };

  const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, ...props }, ref) => (
      <select ref={ref} {...props}>
        {options.map(({ label, value }) => (
          <option key={Math.random()} value={value}>
            {label}
          </option>
        ))}
      </select>
    )
  );

  const onSubmit: SubmitHandler<IProject> = (data) => {
    // Sets form data into Firestore

    const {
      status,
      toDo,
      projectStart,
      projectDue,
      clientName,
      projectName,
      projectLead,
      hours,
      billed,
      notes,
    } = data;

    fetch('/api/dailyEvents/', {
      body: JSON.stringify({
        status,
        toDo,
        projectStart,
        projectDue,
        clientName,
        projectName,
        projectLead,
        hours,
        billed,
        notes,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.reload();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mt-2'>
          <div>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='status'
            >
              Status
            </label>
            <Select
              className='focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              {...register('status')}
              options={[
                { label: 'New', value: 'new' },
                { label: 'Open', value: 'open' },
                { label: 'On Hold', value: 'hold' },
                { label: 'Closing', value: 'closing' },
                { label: 'Finalized', value: 'finalized' },
                { label: 'Cancelled', value: 'cancelled' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='toDo'
            >
              To Do
            </label>
            <textarea
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='toDo'
              {...register('toDo')}
            />
          </div>
          <div className='mb-4'>
            <DatePicker
              id='projectStart'
              label='Date Assigned'
              placeholder='Select your date assigned'
            />
          </div>
          <div className='mb-4'>
            <DatePicker
              id='projectDue'
              label='Requested Completion'
              placeholder='Select your completion date'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='clientName'
            >
              Client Name
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='clientName'
              {...register('clientName')}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='projectName'
            >
              Project Name
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='projectName'
              {...register('projectName')}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='projectLead'
            >
              Project Lead
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='projectLead'
              {...register('projectLead')}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='hours'
            >
              Hours Spent
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='hours'
              {...register('hours')}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='billed'
            >
              Billed
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='billed'
              {...register('billed')}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='billed'
            >
              Billed
            </label>
            <input
              className='focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              id='billed'
              {...register('billed')}
              type='text'
            />
          </div>
        </div>

        <input
          className='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
          type='submit'
          onClick={closeModal}
        />
      </form>
    </FormProvider>
  );
};

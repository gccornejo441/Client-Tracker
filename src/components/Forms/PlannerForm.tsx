import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import DatePicker from '@/components/Forms/DatePicker';
import Input from '@/components/Forms/Input';
import Textarea from '@/components/Forms/Textarea';

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
      client,
      counselor,
      counselingDate,
      state,
      clientGrant,
      billed,
      notes,
    } = data;

    fetch('/api/dailyEvents/', {
      body: JSON.stringify({
        status,
        client,
        counselor,
        counselingDate,
        state,
        clientGrant,
        billed,
        notes,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok)
        router.push({
          pathname: '/[client]/',
          query: { id: client },
        });
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
                { label: 'Not Counseled', value: 'not counseled' },
                { label: 'Counseled', value: 'counseled' },
                { label: 'Awaiting Intakes', value: 'awaiting intakes' },
                { label: 'Closing', value: 'closing' },
                { label: 'Closed', value: 'closed' },
                { label: 'Ongoing', value: 'ongoing' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <Input label='Client' id='client' />
          </div>
          <div>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='counselor'
            >
              Assigned Counselor
            </label>
            <Select
              className='focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              {...register('counselor')}
              options={[
                { label: 'Thomas G', value: 'thomas' },
                { label: 'Gabe C', value: 'gabe' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <DatePicker
              id='counselingDate'
              label='Counseling Session Date'
              placeholder='Select your date assigned'
            />
          </div>
          <div className='mb-4'>
            <Input label='State' id='state' />
          </div>
          <div>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='clientGrant'
            >
              Counseling Grant Type
            </label>
            <Select
              className='focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              {...register('clientGrant')}
              options={[
                { label: 'NMS', value: 'nms' },
                { label: 'HSPC', value: 'hspc' },
                { label: 'NMS & HSPC', value: 'nms-hspc' },
              ]}
            />
          </div>
          <div>
            <label
              className='mb-2 block text-sm font-bold text-gray-700'
              htmlFor='billed'
            >
              Billed
            </label>
            <Select
              className='focus:shadow-outline mb-3 w-full appearance-none rounded py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none'
              {...register('billed')}
              options={[
                { label: 'yes', value: 'yes' },
                { label: 'no', value: 'no' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <Textarea label='Notes' id='notes' rows={3} />
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

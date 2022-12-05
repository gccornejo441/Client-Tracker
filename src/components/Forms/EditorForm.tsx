import { useRouter } from 'next/router';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Input from '@/components/Forms/Input';
import Textarea from '@/components/Forms/Textarea';

import { ICloseEditor, IProject } from '../../../types';

export const EditorForm = ({ closeModal, editEntry }: ICloseEditor) => {
  const methods = useForm<IProject>({
    mode: 'onTouched',
    defaultValues: {
      _id: editEntry._id,
      status: editEntry.status,
      counselor: editEntry.counselor,
      counselingDate: editEntry.counselingDate,
      timeNoteSubmitted: editEntry.timeNoteSubmitted,
      client: editEntry.client,
      state: editEntry.state,
      billed: editEntry.billed,
      notes: editEntry.notes,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    reset,
  } = methods;
  const [submittedData, setSubmittedData] = React.useState({});

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

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [submittedData, reset, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<IProject> = (data) => {
    // Sets form data into Firestore

    const {
      _id,
      status,
      client,
      counselor,
      counselingDate,
      timeNoteSubmitted,
      state,
      billed,
      notes,
    } = data;

    setSubmittedData(data);

    const clientNameToLowerCase = client.toString().toLocaleLowerCase();

    fetch('/api/dataEntryEdits/', {
      body: JSON.stringify({
        _id,
        status,
        client: clientNameToLowerCase,
        counselor,
        counselingDate,
        timeNoteSubmitted,
        state,
        billed,
        notes,
        editEntry,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) router.reload();
    });
  };

  const handleClick = () => {
    reset({});
    closeModal();
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
              required={true}
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
          <div className='hidden'>
            <Input label='_id' id='_id' />
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
              required={true}
              options={[
                { label: 'Thomas G', value: 'thomas' },
                { label: 'Gabe C', value: 'gabe' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <Input label='Date Action Performed' id='counselingDate' />
          </div>
          <div className='mb-4'>
            <Input label='Time Action Performed' id='timeNoteSubmitted' />
          </div>
          <div className='mb-4'>
            <Input required={true} label='State' id='state' />
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
              required={true}
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
            />
          </div>
          <div className='mb-4'>
            <Textarea required={true} label='Notes' id='notes' rows={3} />
          </div>
        </div>

        <input
          className='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200'
          type='submit'
        />
      </form>
      <div className='mt-4 flex justify-between'>
        <button
          type='button'
          className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-red-200'
          onClick={handleClick}
        >
          Cancel
        </button>
      </div>
    </FormProvider>
  );
};

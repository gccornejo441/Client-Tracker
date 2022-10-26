import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';

import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

import { IEvents } from '../../types';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

const EmailForm = () => {
  const { register, handleSubmit } = useForm<IEvents>();

  const onSubmit: SubmitHandler<IEvents> = (data) => {
    // Sets form data into Firestore

    const { eventName, eventMemo } = data;

    fetch('/api/dailyEvents/', {
      method: 'POST',
      body: JSON.stringify({ eventName, eventMemo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
      </div>

      <input
        className='inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
        type='submit'
      />
    </form>
  );
};

interface IPlannerProps {
  isOpen: boolean;
  closeModal(): void;
  openModal(event: React.MouseEvent<HTMLButtonElement>): void;
}

// function IsolateReRender({ control }: { control: Control<FormValues> }) {
//   const eventName = useWatch({
//     control,
//     name: 'eventName',
//     defaultValue: 'default',
//   });

//   return <div>{eventName}</div>;
// }

const Planner = ({ isOpen, closeModal, openModal }: IPlannerProps) => {
  return (
    <>
      <div>
        <button
          type='button'
          onClick={openModal}
          className='font-semi rounded border-b-4 border-blue-700 bg-blue-500 py-2 px-4 text-white hover:border-blue-500 hover:bg-blue-400'
        >
          Plan an event
        </button>
      </div>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Planner
                  </Dialog.Title>

                  <EmailForm />
                  <div className='mt-4 flex justify-between'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default function HomePage() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { data, error } = useSWR(
    '/api/dailyEvents/House Party',
    (apiURL: string) => fetch(apiURL).then((res) => res.json())
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center border-2 border-blue-500 text-center'>
            <div className='flex w-full'>
              <div className='w-1/2 border-2 border-black text-left'>
                <h1>
                  Daily Planner
                  {/* <IsolateReRender control={control} /> */}
                </h1>
              </div>
              <div className='w-1/2 border-2 border-black'>
                <Planner
                  isOpen={isOpen}
                  closeModal={closeModal}
                  openModal={openModal}
                />

                <div>
                  {data.eventData.map((event: IEvents) => (
                    <>
                      <div>{event.eventName}</div>
                      <div>{event.eventMemo}</div>
                    </>
                  ))}
                </div>
              </div>
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://www.webworksdreams.com/'>
                Daily Planner
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

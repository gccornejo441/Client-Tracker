import { Dialog, Transition } from '@headlessui/react';
import * as React from 'react';
import { GiNotebook } from 'react-icons/gi';
import { IPlannerProps } from 'types';

import Button from '@/components/buttons/Button';
import { EmailForm } from '@/components/Forms/PlannerForm';

export const Planner = ({ isOpen, closeModal, openModal }: IPlannerProps) => {
  return (
    <>
      <div>
        <Button onClick={openModal} variant='primary' className='inline-flex'>
          <GiNotebook size={18} />
          <span className='ml-3'>Enter A Client Note</span>
        </Button>
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
                    as='h2'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Planner
                  </Dialog.Title>

                  <EmailForm closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

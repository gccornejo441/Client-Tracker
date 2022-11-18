import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Planner } from '@/components/modal/Planner';
import * as DropDownIcon from '@/components/table/dropDown';

import View from '../../components/table/View';
import { IEventProps, IProject } from '../../../types';

import MenuButtonSVG from '~/svg/MenuButtonSVG.svg';

const TABLELABELS = [
  'Status',
  'To Do',
  'Data Assigned',
  'Requested Competion',
  'Client Name',
  'Project Name',
  'Leads',
  'Hours Spent',
  'Billed',
  'Notes',
];

const Table = (props: IEventProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const router = useRouter();

  const handleRemove = async (id: number) => {
    const response = await fetch('/api/dailyEvents/', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });
    router.reload();
    return response.json();
  };

  return (
    <div className='sm:px-6'>
      <div className='bg-white py-4 px-4 md:py-7 md:px-8 xl:px-10'>
        {/* <div className='pb-10 text-left'>
          <input
            type='text'
            className='border-0 text-5xl font-bold text-indigo-800 outline-none outline-offset-0'
          />
        </div> */}
        <div className='flex flex-col items-start'>
          <Planner
            isOpen={isOpen}
            closeModal={closeModal}
            openModal={openModal}
          />
        </div>
        <div className='mt-7'>
          <table className='w-full whitespace-nowrap'>
            <tbody className=''>
              <tr>
                {TABLELABELS.map((label, index) => (
                  <td
                    key={index}
                    className='mx-6 border border-gray-100 bg-indigo-200 px-6 pl-5 text-left'
                  >
                    {label}
                  </td>
                ))}
              </tr>
              {props.eventValues.map((event: IProject) => (
                <tr
                  key={event._id}
                  tabIndex={0}
                  className='h-16 rounded border border-gray-200 focus:outline-none'
                >
                  <td
                    className={
                      event.status == 'open'
                        ? 'mr-2 bg-green-500 text-base font-medium uppercase leading-none text-white'
                        : 'mr-2 text-base font-medium uppercase leading-none text-gray-700'
                    }
                  >
                    <div className='flex items-center pl-5'>
                      <p>{event.status}</p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <div className='flex items-center'>
                      <p className='ml-2 text-sm leading-none text-gray-600'>
                        {event.toDo}
                      </p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <div className='flex items-center'>
                      <p className='ml-2 text-sm leading-none text-gray-600'>
                        {event.projectStart}
                      </p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <div className='flex items-center'>
                      <p className='ml-2 text-sm leading-none text-gray-600'>
                        {event.projectDue}
                      </p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <div className='flex items-center'>
                      <p className='ml-2 text-sm leading-none text-gray-600'>
                        {event.clientName}
                      </p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <button className='rounded bg-red-100 py-3 px-3 text-sm leading-none text-red-700 focus:outline-none'>
                      {event.projectName}
                    </button>
                  </td>
                  <td className='pl-5'>
                    <div className='flex items-center'>
                      <p className='ml-2 text-sm leading-none text-gray-600'>
                        {event.projectLead}
                      </p>
                    </div>
                  </td>
                  <td className='pl-5'>
                    <View />
                  </td>
                  <td>
                    <div>
                      <Menu
                        as='div'
                        className='relative inline-block text-left'
                      >
                        <div>
                          <Menu.Button className='rounded bg-gray-100 py-3 px-5 text-sm leading-none text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2'>
                            <MenuButtonSVG />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={React.Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='px-1 py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => handleRemove(event._id)}
                                    className={`${
                                      active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <DropDownIcon.DeleteActiveIcon
                                        className='mr-2 h-5 w-5 text-indigo-400'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <DropDownIcon.DeleteInactiveIcon
                                        className='mr-2 h-5 w-5 text-indigo-400'
                                        aria-hidden='true'
                                      />
                                    )}
                                    Delete
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                            <div className='px-1 py-1 '>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      alert('RELAX, THIS DOES NOTHING!');
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <DropDownIcon.EditActiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <DropDownIcon.EditInactiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                    Edit
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      alert('RELAX, THIS DOES NOTHING!');
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <DropDownIcon.DuplicateActiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <DropDownIcon.DuplicateInactiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                    Duplicate
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                            <div className='px-1 py-1'>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      alert('RELAX, THIS DOES NOTHING!');
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <DropDownIcon.ArchiveActiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <DropDownIcon.ArchiveInactiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                    Archive
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => {
                                      alert('RELAX, THIS DOES NOTHING!');
                                    }}
                                    className={`${
                                      active
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                  >
                                    {active ? (
                                      <DropDownIcon.MoveActiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <DropDownIcon.MoveInactiveIcon
                                        className='mr-2 h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                    Move
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;

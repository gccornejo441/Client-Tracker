import * as React from 'react';

import { IEventProps } from '../../../types';

const TABLENAME = ['Event Name', 'Memo', 'Event Start', 'Event End', 'Action'];

const TableName = () => {
  return (
    <>
      <th className='border-r p-2'>
        <input type='checkbox' />
      </th>
      {TABLENAME.map((label, index) => (
        <th
          key={index}
          className='cursor-pointer border-r p-2 text-sm font-thin text-gray-500'
        >
          <div className='flex items-center justify-center'>
            {label}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M8 9l4-4 4 4m0 6l-4 4-4-4'
              />
            </svg>
          </div>
        </th>
      ))}
    </>
  );
};

const Table = ({ tableData }: IEventProps) => {
  return (
    <div className='table w-full p-2'>
      <table className='w-full border'>
        <thead>
          <tr className='border-b bg-gray-50'>
            <TableName />
          </tr>
        </thead>
        <tbody>
          <tr className='bg-gray-50 text-center'>
            <td className='border-r p-2'></td>
            <td className='border-r p-2'>
              <input type='text' className='border p-1' />
            </td>
            <td className='border-r p-2'>
              <input type='text' className='border p-1' />
            </td>
            <td className='border-r p-2'>
              <input type='text' className='border p-1' />
            </td>
            <td className='border-r p-2'>
              <input type='text' className='border p-1' />
            </td>
            <td className='p-2'>
              <input type='text' className='border p-1' />
            </td>
          </tr>

          {tableData.map((event, index) => (
            <tr
              key={index}
              className='border-b bg-gray-100 text-center text-sm text-gray-600'
            >
              <td className='border-r p-2'>
                <input type='checkbox' />
              </td>
              <td className='border-r p-2'>{event.eventName}</td>
              <td className='border-r p-2'>{event.eventMemo}</td>
              <td className='border-r p-2'>{event.eventStart}</td>
              <td className='border-r p-2'>{event.eventEnd}</td>
              <td className='border-r p-2'>{event.eventAction}</td>
              <td>
                <a
                  href='#'
                  className='bg-blue-500 p-2 text-xs font-thin text-white hover:shadow-lg'
                >
                  Edit
                </a>
                <a
                  href='#'
                  className='bg-red-500 p-2 text-xs font-thin text-white hover:shadow-lg'
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

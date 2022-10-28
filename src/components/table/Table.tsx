import * as React from 'react';

import { IEventProps, IEvents } from '../../../types';

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
          className='cursor-pointer border-r py-2 px-10 text-sm font-black text-gray-900 md:text-2xl'
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

const Table = (tableData: IEventProps) => {
  const [list] = React.useState<IEventProps>(tableData);

  // const handleRemove = (id: number) => {
  //   const eventId = String(id);
  // };

  return (
    <div className='table w-full p-2'>
      <table className='w-full border'>
        <thead>
          <tr className='border-b bg-gray-50'>
            <TableName />
          </tr>
        </thead>
        <tbody>
          {list.tableData.map((event: IEvents) => (
            <tr
              key={event._id}
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
              <td className='border-r p-2'>{String(event._id)}</td>
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
                  // onClick={() => handleRemove(event._id)}
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

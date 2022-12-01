import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiOutlineCalendar } from 'react-icons/hi';

import 'react-datepicker/dist/react-datepicker.css';

import { classNames } from '@/lib/helper';

type DatePickerProps = {
  validation?: RegisterOptions;
  label: string;
  id: string;
  placeholder?: string;
  defaultYear?: number;
  defaultMonth?: number;
  defaultValue?: string;
  helperText?: string;
  readOnly?: boolean;
} & Omit<ReactDatePickerProps, 'onChange'>;

export default function DatePicker({
  validation,
  label,
  id,
  placeholder,
  defaultYear,
  defaultMonth,
  defaultValue,
  helperText,
  readOnly = false,
  ...rest
}: DatePickerProps) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  // If there is a year default, then change the year to the props
  const defaultDate = new Date();
  if (defaultYear) defaultDate.setFullYear(defaultYear);
  if (defaultMonth) defaultDate.setMonth(defaultMonth);

  return (
    <div className='relative'>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-bold text-gray-700'
      >
        {label}
      </label>

      <Controller
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        name={id}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div className='relative mt-1'>
              <ReactDatePicker
                name={id}
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                className={classNames(
                  readOnly
                    ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
                    : errors[id]
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-900 focus:border-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-800',
                  'block w-full rounded-md shadow-sm'
                )}
                placeholderText={placeholder}
                aria-describedby={id}
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                openToDate={value ?? defaultDate}
                dateFormat='MM/dd/yyyy'
                readOnly={readOnly}
                {...rest}
              />
              <HiOutlineCalendar className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 transform text-lg text-gray-500' />
            </div>
            <div className='mt-1'>
              {helperText !== '' && (
                <p className='text-xs text-gray-500'>{helperText}</p>
              )}
              {errors[id] && (
                <span className='text-sm text-red-500'>
                  {errors[id]?.message as string}
                </span>
              )}
            </div>
          </>
        )}
      />
    </div>
  );
}

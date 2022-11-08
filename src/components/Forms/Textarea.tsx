import clsx from 'clsx';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

export type TextareaProps = {
  label: string;
  id: string;
  placeholder?: string;
  helperText?: string;
  type?: string;
  readOnly?: boolean;
  validation?: RegisterOptions;
  cols?: number;
  rows?: number;
} & React.ComponentPropsWithoutRef<'textarea'>;

export default function Textarea({
  label,
  placeholder = '',
  helperText,
  id,
  readOnly = false,
  validation,
  cols,
  rows,
  ...rest
}: TextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-bold text-gray-700'
      >
        {label}
      </label>
      <div className='relative mt-1'>
        <textarea
          {...register(id, validation)}
          {...rest}
          name={id}
          id={id}
          cols={cols}
          rows={rows}
          readOnly={readOnly}
          className={clsx(
            readOnly
              ? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
              : errors[id]
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-900 focus:border-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-800',
            'block w-full rounded-md shadow-sm'
          )}
          placeholder={placeholder}
          aria-describedby={id}
        />

        {errors[id] && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <HiExclamationCircle className='text-xl text-red-500' />
          </div>
        )}
      </div>
      <div className='mt-1'>
        {helperText && <p className='text-xs text-gray-500'>{helperText}</p>}
        {errors[id] && (
          <span className='text-sm text-red-500'>
            {errors[id]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
}

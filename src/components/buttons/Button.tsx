import * as React from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

enum ButtonVariant {
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
  'danger',
}

type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsxm(
          'm-2 items-center rounded px-4 py-2 font-medium',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-colors duration-75',
          //#region  //*=========== Variants ===========
          [
            variant === 'primary' && [
              'bg-indigo-500 text-white',
              'border border-indigo-600',
              'hover:bg-indigo-600 hover:text-white',
              'active:bg-indigo-500',
              'disabled:bg-indigo-400 disabled:hover:bg-indigo-400',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border border-primary-500',
              'disabled:bg-primary-100 hover:bg-primary-50 active:bg-primary-100',
              isDarkBg &&
                'disabled:bg-gray-800 hover:bg-gray-900 active:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'disabled:bg-primary-100 hover:bg-primary-50 active:bg-primary-100',
              isDarkBg &&
                'disabled:bg-gray-800 hover:bg-gray-900 active:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-dark ',
              'border border-gray-300',
              'hover:bg-gray-100 hover:text-dark',
              'disabled:bg-gray-200 active:bg-white/80',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'disabled:bg-gray-700 hover:bg-gray-800 active:bg-gray-700',
            ],
            variant === 'danger' && [
              'bg-red-500 text-white',
              'border border-red-600',
              'disabled:bg-red-700 hover:bg-red-700 active:bg-red-700',
            ],
          ],
          //#endregion  //*======== Variants ===========
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none disabled:cursor-wait hover:text-transparent',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={clsxm(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {children}
      </button>
    );
  }
);

export default Button;

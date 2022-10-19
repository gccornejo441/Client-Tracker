import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

// import { Dialog, Transition } from '@headlessui/react'
// import { useForm, useWatch, Control, UseFormRegister } from "react-hook-form";
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Vercel from '~/svg/Vercel.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

// type FormValues = {
//   eventName: string;
//   lastName: string;
// };

// interface IPlannerProps<TContext = any> {
//   isOpen: boolean;
//   closeModal(event: React.MouseEvent<HTMLButtonElement>): void;
//   openModal(event: React.MouseEvent<HTMLButtonElement>): void;
//   register: UseFormRegister<FormValues>;
//   onSubmit: (event: React.SyntheticEvent) => {};
//   control: Control<FormValues, TContext>;
// }

// function IsolateReRender({ control }: { control: Control<FormValues> }) {
//   const eventName = useWatch({
//     control,
//     name: "eventName",
//     defaultValue: "default"
//   });

//   return <div>{eventName}</div>;
// }

// const Planner = ({ isOpen, closeModal, openModal, register, onSubmit, control }: IPlannerProps) => {

//   return (
//     <>
//       <div >
//         <button
//           type="button"
//           onClick={openModal}
//           className="bg-blue-500 hover:bg-blue-400 text-white font-semi py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
//         >
//           Open dialog
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={React.Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={React.Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <form onSubmit={onSubmit}>

//             <div className="fixed inset-0 overflow-y-auto">
//               <div className="flex min-h-full items-center justify-center p-4 text-center">
//                 <Transition.Child
//                   as={React.Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 scale-95"
//                   enterTo="opacity-100 scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 scale-100"
//                   leaveTo="opacity-0 scale-95"
//                 >
//                   <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg font-medium leading-6 text-gray-900"
//                     >
//                       Planner
//                     </Dialog.Title>
//                     <div className="mt-2">
//                       <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Event Name</label>
//                         <input
//                           className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                           id="password"
//                           type="text"
//                           {...register("eventName")}
//                           placeholder="John's kickback"
//                         />

//                       </div>
//                       <div className="mb-4">
//                         <label
//                           className="block text-gray-700 text-sm font-bold mb-2"
//                           htmlFor="Memo">
//                           Memo
//                         </label>
//                         <textarea
//                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                           id="Memo"
//                           placeholder="Remember to bring a six pack of IPAs." />
//                       </div>
//                     </div>

//                     <div className="flex justify-between mt-4">
//                       <input
//                         className="inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                         type="submit"
//                       />

//                       <button
//                         type="button"
//                         className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                         onClick={closeModal}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </form>

//         </Dialog>
//       </Transition>
//     </>
//   )
// }

export default function HomePage() {
  // let [isOpen, setIsOpen] = React.useState<boolean>(true)
  // const { register, control, handleSubmit } = useForm<FormValues>();
  // const onSubmit = handleSubmit((data) => console.log(data));

  // function closeModal() {
  //   setIsOpen(false)
  // }

  // function openModal() {
  //   setIsOpen(true)
  // }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center border-2 border-blue-500 text-center'>
            <Vercel className='text-5xl' />
            <div className='flex w-full'>
              <div className='w-1/2 border-2 border-black text-left'>
                <h1>
                  Daily Planner
                  {/* <IsolateReRender control={control} /> */}
                </h1>
              </div>
              <div className='w-1/2 border-2 border-black'>
                {/* <button className="bg-blue-500 hover:bg-blue-400 text-white font-semi py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Click Me</button> */}
                {/* <Planner
                  onSubmit={onSubmit}
                  register={register}
                  isOpen={isOpen}
                  closeModal={closeModal}
                  openModal={openModal}
                  control={control} /> */}
              </div>
            </div>
            <p className='mt-2 text-sm text-gray-700'>
              <ArrowLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='light'>
              See all components
            </ButtonLink>

            <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Ftheodorusclarence%2Fts-nextjs-tailwind-starter'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>

            <footer className='absolute bottom-2 text-gray-700'>
              © {new Date().getFullYear()} By{' '}
              <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                Theodorus Clarence
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

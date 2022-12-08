import clsx from 'clsx';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import * as React from 'react';

import { auth } from '@/lib/firebaseConfig';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

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

const CLIENTFORMS = [
  {
    _id: '1',
    name: 'Client Intake',
    href: 'https://firebasestorage.googleapis.com/v0/b/tracking-20xx.appspot.com/o/Client%20Forms%2FHUD_CLIENT_INTAKE.pdf?alt=media&token=9d383068-d2ff-4e70-b28f-505947e43a51',
  },
  {
    _id: '2',
    name: 'HSCP Authorization',
    href: 'https://firebasestorage.googleapis.com/v0/b/tracking-20xx.appspot.com/o/Client%20Forms%2FHSCP_AUTH.pdf?alt=media&token=60da912e-1e13-4518-b4c2-5f0562455977',
  },
  {
    _id: '3',
    name: 'Third-Party Authorization',
    href: 'https://firebasestorage.googleapis.com/v0/b/tracking-20xx.appspot.com/o/Client%20Forms%2FHUD_THIRD_PARTY.pdf?alt=media&token=08483df6-bfc9-492b-b3f3-2130021e8733',
  },
  {
    _id: '4',
    name: 'Monthly Family Budget',
    href: 'https://firebasestorage.googleapis.com/v0/b/tracking-20xx.appspot.com/o/Client%20Forms%2FHUD_Budget.pdf?alt=media&token=24af7b92-af50-40ab-a891-579ca36a0f65',
  },
];

export default function Forms() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!loading)
    return (
      <div className='center'>
        <div className='spinner'></div>
        <p className='mt-[10%] text-5xl font-bold text-indigo-700'>
          Loading...
        </p>
      </div>
    );

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-gray-100'>
          <div className='layout flex min-h-screen flex-col justify-center text-center'>
            <div className='flex w-fit flex-col'>
              <Button onClick={() => signOut(auth)} variant='primary'>
                Sign Out
              </Button>
              <Link href='/'>
                <Button variant='danger'>Back</Button>
              </Link>
            </div>
            <ol className='mt-8 space-y-6 text-left'>
              {CLIENTFORMS.map((form, id) => {
                return (
                  <li key={id} className='space-y-2'>
                    <h2 className='text-lg md:text-xl'>{form.name}</h2>
                    <p className={clsx('!mt-1 text-sm')}>
                      No style applied, differentiate internal and outside
                      links, give custom cursor for outside links.
                    </p>
                    <div className='space-x-2'>
                      <PrimaryLink href={form.href}>{form.name}</PrimaryLink>
                    </div>
                  </li>
                );
              })}
            </ol>
            <footer className='my-10 text-gray-700'>
              © {new Date().getFullYear()}{' '}
              <UnderlineLink href='https://www.webworksdreams.com/'>
                Client Tracker By WebWorkDreams
              </UnderlineLink>
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
}

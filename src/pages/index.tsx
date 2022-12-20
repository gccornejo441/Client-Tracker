import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import * as React from 'react';
import useSWR from 'swr';

import { auth } from '@/lib/firebaseConfig';

import Button from '@/components/buttons/Button';
import LoginForm from '@/components/Forms/LoginForm';
import SearchClient from '@/components/Forms/SearchClient';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';
import TableAwaiting from '@/components/table/TableAwaiting';

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

const Loader = () => {
  return (
    <div className='center cursor-wait'>
      <div className='spinner'></div>
      <p className='mt-[10%] text-5xl font-bold text-indigo-700'>Loading...</p>
    </div>
  );
};

export default function HomePage() {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState('User');

  const { data, error } = useSWR(`/api/dailyEvents/`, (apiURL: string) =>
    fetch(apiURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  );

  React.useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        setUser(user.email as string);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-gray-100'>
          <div className='flex min-h-screen flex-col justify-center text-center'>
            {loading ? (
              <div>
                <div className='flex w-fit'>
                  <Button onClick={() => signOut(auth)} variant='primary'>
                    Sign Out
                  </Button>
                  <Link href='/forms'>
                    <Button variant='danger'>Client Forms</Button>
                  </Link>
                  <Link href='/spreadsheets'>
                    <Button variant='danger'>HSCP Report</Button>
                  </Link>
                </div>
                {user && <p>Welcome, {user}!</p>}
                <SearchClient />
                <TableAwaiting eventValues={data} />
                <Table eventValues={data} />
              </div>
            ) : (
              <div>
                <LoginForm setUser={setUser} />
              </div>
            )}
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

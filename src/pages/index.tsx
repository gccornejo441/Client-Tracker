import * as React from 'react';
import useSWR from 'swr';

import LoginForm from '@/components/Forms/LoginForm';
import SearchClient from '@/components/Forms/SearchClient';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

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

export default function HomePage() {
  const [userEmail, setUserEmail] = React.useState('');

  const { data, error } = useSWR(`/api/dailyEvents/`, (apiURL: string) =>
    fetch(apiURL, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json())
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div className='text-center'>
        <div className='spinner'></div>
      </div>
    );

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-gray-100'>
          <div className='flex min-h-screen flex-col justify-center text-center'>
            <div>
              {!userEmail ? (
                <div>
                  <LoginForm setUserEmail={setUserEmail} />
                </div>
              ) : (
                <>
                  <h2>Welcome, {userEmail}</h2>
                  <SearchClient />
                  <Table eventValues={data} />
                </>
              )}
            </div>

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

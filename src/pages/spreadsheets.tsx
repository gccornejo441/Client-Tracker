import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import * as React from 'react';

import { auth } from '@/lib/firebaseConfig';

import Button from '@/components/buttons/Button';
import Grid from '@/components/grid';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

const Loader = () => {
  return (
    <div className='center cursor-wait'>
      <div className='spinner'></div>
      <p className='mt-[10%] text-5xl font-bold text-indigo-700'>Loading...</p>
    </div>
  );
};

function SpreadSheet() {
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

  if (!loading) return <Loader />;

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <section className='bg-gray-100'>
          <div className='flex min-h-screen flex-col justify-center text-center'>
            <div>
              <div>
                <div className='flex w-fit flex-col'>
                  <Button onClick={() => signOut(auth)} variant='primary'>
                    Sign Out
                  </Button>
                  <Link href='/'>
                    <Button variant='danger'>Back</Button>
                  </Link>
                </div>
              </div>
              <Grid />
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

export default SpreadSheet;

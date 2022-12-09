import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import { auth } from '@/lib/firebaseConfig';

import Button from '@/components/buttons/Button';
import SearchClient from '@/components/Forms/SearchClient';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ClientCommingIn() {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.client ? `/api/dailyEvents/${router.query.client}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
              <SearchClient />
              <Table eventValues={data} />
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

export default ClientCommingIn;

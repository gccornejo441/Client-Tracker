import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import SearchClient from '@/components/Forms/SearchClient';
import Layout from '@/components/layout/Layout';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Giftwrap() {
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
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <SearchClient />
            <div>
              <Table eventValues={data.eventValues} />
            </div>

            <footer className='absolute bottom-2 text-gray-700'>
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

export default Giftwrap;

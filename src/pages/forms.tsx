import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import Link from 'next/link';
import * as React from 'react';

import { auth, storage } from '@/lib/firebaseConfig';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import Seo from '@/components/Seo';

// Create a reference under which you want to list
const listRef = ref(storage, 'Client Forms');

interface IClientFormStorage {
  _id: number;
  name: string;
  href: string;
}

export default function Forms() {
  const [loading, setLoading] = React.useState(false);
  const [storedFile, setStoredFile] = React.useState<IClientFormStorage[]>([]);

  React.useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setStoredFile((storedFile) => [
            ...storedFile,
            {
              _id: Math.random(),
              name: itemRef.name,
              href: url,
            },
          ]);
        });
      });
    });

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
              {storedFile.map((form, id) => {
                return (
                  <li key={id} className='space-y-2'>
                    <h2 className='text-lg md:text-xl'>{form.name}</h2>
                    <div className='space-x-2'>
                      <PrimaryLink href={form.href}>Go To Form</PrimaryLink>
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

import { useRouter } from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

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
    <div>
      <div className='bg-white py-12 text-black'>
        {data.client}
        {/* <Link href="/">
                    <Button variant="gradient">Back Home</Button>
                </Link>
                <GMap
                    mapData={data.mapData}
                /> */}
      </div>
    </div>
  );
}

export default Giftwrap;

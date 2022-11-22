import { getDocs } from '@firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProject } from 'types';

import { createCollection } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query: client, method } = req;

  if (method == 'POST') {
    const eventsCol = createCollection<IProject>('Clients');
    const getClientsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: IProject[] = [];

    getClientsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();
      eventValues.push(event);
    });

    res.status(200).json({ client: client, eventValues: eventValues });
  } else if (method == 'GET') {
    const eventsCol = createCollection<IProject>('Clients');
    const getClientsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: IProject[] = [];

    getClientsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();
      eventValues.push(event);
    });

    res.status(200).json({ eventValues: eventValues });
  }
}

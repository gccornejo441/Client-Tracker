import { getDocs } from '@firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProject } from 'types';

import { createCollection } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method == 'GET') {
    const eventsCol = createCollection<IProject>('Daily Events');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: IProject[] = [];

    // Get Google map data.
    const getEventData = () => {
      getEventsDocs.docs.forEach((eventDoc) => {
        const event = eventDoc.data();
        eventValues.push(event);
      });
      return eventValues;
    };
    res.status(200).json({ id, eventData: getEventData() });
  }
}

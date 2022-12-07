import { getDocs } from '@firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IEntry, IProject } from 'types';

import { createCollection } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query: client, method } = req;

  if (method == 'POST') {
    const eventsCol = createCollection<IProject>('Clients Notes');
    const getClientsDocs = await getDocs(eventsCol);

    // // Get Giftwrap documents from Firestore
    const eventsDocs = doc(eventsCol, req.body.client);

    const docSnap = await getDoc(eventsDocs);
    const eventValues: IProject[] = [];

    try {
      if (docSnap.exists()) {
        // Returns values

        getClientsDocs.docs.forEach((eventDoc) => {
          const event = eventDoc.data();
          eventValues.push(event);
        });
      } else {
        throw 'Not Found.';
      }

      res.status(200).json({ client: client, eventValues: eventValues });
    } catch (e) {
      res.status(400).json(e);
    }
  } else if (method == 'GET') {
    const eventsCol = createCollection<IEntry>('Clients Notes');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: string[] = [];

    getEventsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();

      let key: keyof IEntry['noteEntries'];

      const notesArray = event.noteEntries;

      for (key in notesArray) {
        if (notesArray[key]['client'] == client.client) {
          eventValues.push(notesArray[key]);
        }
      }
    });

    res.status(200).json(eventValues);
  }
}

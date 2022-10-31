import { getDocs } from '@firebase/firestore';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IEvents } from 'types';

import { createCollection, database } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventName, eventMemo, eventStart, eventEnd, eventAction } = req.body;
  const dateApi = Date.now();

  if (req.method === 'POST') {
    // POST document to Firestore.
    // Giftwrap Collection from Firestore
    const eventsCol = createCollection<IEvents>('Daily Events');

    // Get Giftwrap documents from Firestore
    const eventsDocs = doc(eventsCol, `${dateApi}`);

    // POST document to Firestore.
    await setDoc(eventsDocs, {
      _id: dateApi,
      eventName: eventName,
      eventMemo: eventMemo,
      eventStart: eventStart,
      eventEnd: eventEnd,
      eventAction: eventAction,
    });

    try {
      res.status(201).json({ eventName, eventMemo });
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else if (req.method === 'PUT') {
    const eventRef = doc(database, 'Daily Events', `${req.body}`);

    await deleteDoc(eventRef);

    res.status(201).json({ removedId: req.body });
  } else if (req.method == 'GET') {
    const eventsCol = createCollection<IEvents>('Daily Events');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: IEvents[] = [];

    // Get Google map data.
    const getEventData = () => {
      getEventsDocs.docs.forEach((eventDoc) => {
        const event = eventDoc.data();
        eventValues.push(event);
      });
      return eventValues;
    };

    res.status(200).json({ eventData: getEventData() });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

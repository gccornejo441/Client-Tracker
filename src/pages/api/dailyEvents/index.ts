import { getDocs } from '@firebase/firestore';
import dateFormat from 'dateformat';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IEntry } from 'types';

import { createCollection, database } from '../../../lib/firebaseConfig';

const now = new Date();

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { status, client, counselor, counselingDate, state, billed, notes } =
    req.body;

  // Time Formating Data
  // #########################
  const dateApi = Date.now();
  // #########################

  if (req.method === 'POST') {
    // POST document to Firestore.
    // Giftwrap Collection from Firestore
    const eventsCol = createCollection<IEntry>('Clients Notes');

    const counselingDateSession = dateFormat(counselingDate, 'mmmm dS, yyyy');

    const timeNoteSubmitted = dateFormat(now, 'h:MM:ss TT');

    const eventsDocs = doc(eventsCol, client);

    const docSnap = await getDoc(eventsDocs);

    // Creates a new timestamp from the given date.
    // const timestamp = Timestamp.fromDate(new Date());

    if (docSnap.exists()) {
      const noteEntryDocRef = doc(database, 'Clients Notes', `${client}`);

      await updateDoc(noteEntryDocRef, {
        noteEntries: arrayUnion({
          _id: dateApi,
          status: status,
          client: client,
          counselor: counselor,
          counselingDate: counselingDate,
          state: state,
          billed: billed,
          notes: notes,
        }),
      });
    } else {
      // // POST document to Firestore.
      await setDoc(eventsDocs, {
        noteEntries: arrayUnion({
          _id: dateApi,
          status: status,
          counselor: counselor,
          client: client,
          counselingDate: counselingDateSession,
          timeNoteSubmitted: timeNoteSubmitted,
          state: state,
          billed: billed,
          notes: notes,
        }),
      });
    }

    try {
      res.status(201).json({ counselor, client });
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else if (req.method === 'PUT') {
    const noteEntryDocRef = doc(
      database,
      'Clients Notes',
      `${req.body.client}`
    );

    await updateDoc(noteEntryDocRef, {
      noteEntries: arrayRemove(req.body),
    });

    res.status(201).json({ removedId: `${req.body} has been removed!` });
  } else if (req.method == 'GET') {
    const eventsCol = createCollection<IEntry>('Clients Notes');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: Array<string> = [];

    getEventsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();

      let key: keyof IEntry['noteEntries'];

      const notesArray = event.noteEntries;

      for (key in notesArray) {
        eventValues.push(notesArray[key]);
      }
    });

    res.status(200).json(eventValues);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

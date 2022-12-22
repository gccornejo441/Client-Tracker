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

    const noteEntry = {
      _id: dateApi,
      counselor: counselor,
      counselingDate: counselingDateSession,
      timeNoteSubmitted: timeNoteSubmitted,
      state: state,
      billed: billed,
      notes: notes,
    };

    if (docSnap.exists()) {
      const noteEntryDocRef = doc(database, 'Clients Notes', `${client}`);

      await updateDoc(noteEntryDocRef, {
        status: status,
        billed: billed,
        noteEntries: arrayUnion(noteEntry),
      });
    } else {
      // POST document to Firestore.
      await setDoc(eventsDocs, {
        status: status,
        client: client,
        billed: billed,
        noteEntries: arrayUnion(noteEntry),
      });
    }

    try {
      res.status(201).json({ counselor, client });
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else if (req.method === 'PUT') {
    const noteEntryDocRef = doc(database, 'Clients Notes', `${client}`);

    await updateDoc(noteEntryDocRef, {
      noteEntries: arrayRemove(req.body),
    });

    res.status(201).json({ removedId: `${req.body} has been removed!` });
  } else if (req.method == 'GET') {
    const eventsCol = createCollection<IEntry>('Clients Notes');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: Array<object> = [];

    getEventsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();

      let key: keyof IEntry['noteEntries'];

      const noteEntries = event.noteEntries;

      for (key in noteEntries) {
        const note = {
          client: event.client,
          status: event.status,
          billed: event.billed,
          noteEntries: noteEntries[key],
        };
        eventValues.push(note);
      }
    });

    res.status(200).json(eventValues);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

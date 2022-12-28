import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    _id,
    status,
    client,
    counselor,
    counselingDate,
    timeNoteSubmitted,
    state,
    billed,
    notes,
    editEntry,
  } = req.body;

  if (req.method === 'POST') {
    const noteEntryDocRef = doc(database, 'Clients Notes', `${client}`);

    const noteEntry = {
      _id: _id,
      client: client,
      status: status,
      counselor: counselor,
      counselingDate: counselingDate,
      timeNoteSubmitted: timeNoteSubmitted,
      state: state,
      billed: billed,
      notes: notes,
    };

    await updateDoc(noteEntryDocRef, {
      noteEntries: arrayRemove(editEntry),
    });

    await updateDoc(noteEntryDocRef, {
      status: status,
      client: client,
      billed: billed,
      noteEntries: arrayUnion(noteEntry),
    });

    try {
      res.status(201).json('ENTRY UPDATED');
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { doc, updateDoc } from 'firebase/firestore';
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
  } = req.body;

  if (req.method === 'POST') {
    const noteEntryDocRef = doc(database, 'Clients', `${req.body._id}`);

    await updateDoc(noteEntryDocRef, {
      _id: _id,
      status: status,
      client: client,
      counselor: counselor,
      counselingDate: counselingDate,
      timeNoteSubmitted: timeNoteSubmitted,
      state: state,
      billed: billed,
      notes: notes,
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

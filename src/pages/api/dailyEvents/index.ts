import { getDocs } from '@firebase/firestore';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IProject } from 'types';

import { createCollection, database } from '../../../lib/firebaseConfig';

const getFormatedDate = async (unformatedDate: string) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const newDate = new Date(unformatedDate);

  const longDate = `${months[newDate.getMonth()]} 
         ${newDate.getDate()}, 
         ${newDate.getFullYear()}`;

  return longDate;
};

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    status,
    toDo,
    projectStart,
    projectDue,
    clientName,
    projectName,
    projectLead,
    hours,
    billed,
  } = req.body;
  const dateApi = Date.now();

  if (req.method === 'POST') {
    // POST document to Firestore.
    // Giftwrap Collection from Firestore
    const eventsCol = createCollection<IProject>('Daily Events');

    const newProjectStart = await getFormatedDate(projectStart);
    const newProjectDue = await getFormatedDate(projectDue);

    // Get Giftwrap documents from Firestore
    const eventsDocs = doc(eventsCol, `${dateApi}`);

    // POST document to Firestore.
    await setDoc(eventsDocs, {
      _id: dateApi,
      status: status,
      toDo: toDo,
      projectStart: newProjectStart,
      projectDue: newProjectDue,
      clientName: clientName,
      projectName: projectName,
      projectLead: projectLead,
      hours: hours,
      billed: billed,
    });

    try {
      res.status(201).json({ projectName, clientName });
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else if (req.method === 'PUT') {
    const eventRef = doc(database, 'Daily Events', `${req.body}`);

    await deleteDoc(eventRef);

    res.status(201).json({ removedId: req.body });
  } else if (req.method == 'GET') {
    const eventsCol = createCollection<IProject>('Daily Events');
    const getEventsDocs = await getDocs(eventsCol);

    // Returns values
    const eventValues: IProject[] = [];

    // Get Google map data.
    getEventsDocs.docs.forEach((eventDoc) => {
      const event = eventDoc.data();
      eventValues.push(event);
    });

    res.status(200).json(eventValues);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

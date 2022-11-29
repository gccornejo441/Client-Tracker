import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  if (req.method === 'POST') {
    try {
      const userAuthEmail = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userInformation = userAuthEmail.user;

      res.status(201).json({ email: userInformation.email });
    } catch (err) {
      res
        .status(500)
        .send({ error: 'These credentials do not match our records.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

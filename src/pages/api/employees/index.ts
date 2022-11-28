// import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';

// import { auth } from '../../../lib/firebaseConfig';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { email, password } = req.body;

  if (req.method === 'POST') {
    // const sssss = await signInWithEmailAndPassword(auth, email, password);
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   user.toJSON()
    //   console.log("user: ", user)

    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    // });

    // const cnt = sssss.user

    // console.log("cnnnnnn: ", cnt)

    try {
      res.status(201);
    } catch (err) {
      res.status(500).send({ error: 'failed fetch' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

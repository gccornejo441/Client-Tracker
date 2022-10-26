// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSOSf4lcYVr5nRWDUS3eCh7DpFJOCPTMY',
  authDomain: 'house-a-vet.firebaseapp.com',
  databaseURL: 'https://house-a-vet-default-rtdb.firebaseio.com',
  projectId: 'house-a-vet',
  storageBucket: 'house-a-vet.appspot.com',
  messagingSenderId: '514072015008',
  appId: '1:514072015008:web:59cc2f6442e016b5c399c5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(database, collectionName) as CollectionReference<T>;
};

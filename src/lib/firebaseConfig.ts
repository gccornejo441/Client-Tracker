// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const provider = new GoogleAuthProvider();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB0gYl5bv6u3Z9pVoDmgLmm-X3d9nXAAFs',
  authDomain: 'tracking-20xx.firebaseapp.com',
  projectId: 'tracking-20xx',
  storageBucket: 'tracking-20xx.appspot.com',
  messagingSenderId: '860648480711',
  appId: '1:860648480711:web:666011d9e11664db5a03e2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(database, collectionName) as CollectionReference<T>;
};

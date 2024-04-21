// firebase-utils.js
import initializeFirebase from '../config/firebase.config';
import FirebaseAuthService from './firebase-auth.utils';
import FirebaseFirestoreService from './firebase-firestore.utils';
import FireStorageService from './firebase-storage.utils';

const { firebase, auth } = initializeFirebase();
const firebaseAuthService = new FirebaseAuthService(firebase, auth);
const firebaseFirestoreService = new FirebaseFirestoreService(firebase);
const fireStorageService = new FireStorageService(firebase);

module.exports = {
    firebase,
    firebaseAuthService,
    firebaseFirestoreService,
    fireStorageService
};

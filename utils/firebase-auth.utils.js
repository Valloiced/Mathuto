import {
    getAuth,
    reauthenticateWithCredential,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    EmailAuthProvider
} from 'firebase/auth';
import { filterUserSession } from './auth.utils';

class FirebaseAuthService {
    constructor(firebase, authState) {
        this.authState = authState;
        this.auth = getAuth(firebase);
    }

    async getIdToken() {
        try {
            const user = this.auth.currentUser;

            if (user) {
                const idToken = await user.getIdToken();
                return idToken;
            } else {
                throw new Error('No user signed in');
            }
        } catch (error) {
            console.error('Error getting ID token:', error);
            throw error;
        }
    }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(
                this.auth,
                (user) => {
                    if (user) {
                        resolve(filterUserSession(user));
                    } else {
                        reject(new Error('No user yet'));
                    }
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getEmailAuthProvider() {
        return EmailAuthProvider;
    }

    async reauthenticateWithPassword(email, password) {
        try {
            const user = this.auth.currentUser;
            const credential = this.getEmailAuthProvider().credential(email, password);
            await reauthenticateWithCredential(user, credential);

            return true;
        } catch (error) {
            console.error('Error reauthenticating:', error);
            return false;
        }
    }

    async sendPasswordReset(email) {
        try {
            await sendPasswordResetEmail(this.auth, email);
            return true;
        } catch (error) {
            console.error('Error initializing password reset:', error.message);
            return false;
        }
    }

    async signUp(email, password) {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );

            const user = userCredentials.user;

            // Include metadata for firestore collection
            return { ...filterUserSession(user), metadata: user.metadata };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logIn(email, password) {
        try {
            const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);

            const user = userCredentials.user;

            return filterUserSession(user);
        } catch (error) {
            console.error(error.code);
            throw error;
        }
    }

    async logOut() {
        try {
            await signOut(this.auth);

            return { message: 'Signout successfully' };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default FirebaseAuthService;

import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';

class FirestoreService {
    constructor(firebase) {
        this.firestore = getFirestore(firebase);
    }

    async addDocument(collectionPath, data) {
        try {
            const collectionRef = collection(this.firestore, collectionPath);
            return await addDoc(collectionRef, data);
        } catch (error) {
            console.error('Error adding document', error.message);
            throw new Error(error);
        }
    }

    async getDocuments(collectionPath) {
        try {
            const collectionRef = collection(this.firestore, collectionPath);
            return await getDocs(collectionRef);
        } catch (error) {
            console.error('Error adding document', error.message);
            throw new Error(error);
        }
    }
}

export default FirestoreService;

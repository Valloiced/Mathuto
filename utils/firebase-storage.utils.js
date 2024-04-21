import { getStorage, getDownloadURL, ref, uploadBytes } from 'firebase/storage';

class FireStorageService {
    constructor(firebase) {
        this.storage = getStorage(firebase);
    }

    async uploadFile(destinationPath, file) {
        try {
            if (!file || !destinationPath) {
                return;
            }

            // Get the filename from the file object
            const filename = file.name;

            // Construct the full path within Firebase Storage
            const fullPath = `${destinationPath}/${filename}`;

            // Get a reference to the storage location
            const storageRef = ref(this.storage, fullPath);

            // Upload the file
            const snapShot = await uploadBytes(storageRef, file);

            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);

            return {
                isUploaded: true,
                url: downloadURL
            };
        } catch (error) {
            console.error('Error uploading file:', error.message);
            throw error;
        }
    }
}

export default FireStorageService;

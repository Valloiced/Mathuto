import { fireStorageService } from './firebase.utils';

const uploadProfileImg = async (destinationPath, uri, uid) => {
    try {
        const response = await fetch(uri);
        const blob = await response.blob();

        // Add a filename (usually the uid)
        const file = new File([blob], uid, { type: blob.type });

        // Upload the file to Firebase Storage
        const status = await fireStorageService.uploadFile(destinationPath, file);

        return status;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};

module.exports = { uploadProfileImg };

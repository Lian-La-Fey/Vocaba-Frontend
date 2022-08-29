import { deleteObject, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";

export const cleanFirebaseStorage = (userWords, userId) => {
  userWords.forEach((userWord) => {
    const clipListRef = ref(storage, `clips/${userId}/words/${userWord._id}`);
    listAll(clipListRef).then((response) => {
      const _firebaseStorageNames = response.items.map((item) => item.name);
      const _wordStorageNames = userWord.clips.map((clip) => clip.storageName);
      _firebaseStorageNames.forEach((storageName) => {
        if (!_wordStorageNames.includes(storageName)) {
          const videoRef = ref(
            storage,
            `clips/${userId}/words/${userWord._id}/${storageName}`
          );
          deleteObject(videoRef)
            .then(() => {})
            .catch((error) => {});
        }
      });
    });
  });
};

export const deleteWords = (words, userId) => {
  words.forEach((word) => {
    const clipListRef = ref(storage, `clips/${userId}/words/${word._id}`);
    listAll(clipListRef).then((response) => {
      const _firebaseStorageNames = response.items.map((item) => item.name);
      _firebaseStorageNames.forEach((storageName) => {
        const videoRef = ref(
          storage,
          `clips/${userId}/words/${word._id}/${storageName}`
        );
        deleteObject(videoRef)
          .then(() => {})
          .catch((error) => {});
      });
    });
  });
};

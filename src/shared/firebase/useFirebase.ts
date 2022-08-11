import React, { useState} from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "shared/firebase";
import Swal from "sweetalert2";

const useFirebase = () => {
  const [uris, setUris] = useState<string[]>([]);

  const uploadToFirebase = (files: File[], folder: string) => {
    setUris([]);

    files.forEach((file) => {
      const storageRef = ref(storage, `/${folder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          Swal.fire({
            icon: "error",
            text: "Storage error",
          });
        },
        async () => {
          let uri = await getDownloadURL(uploadTask.snapshot.ref);
          setUris((prev) => [...prev, uri]);
        }
      );
    });
    
  };

  return { uploadToFirebase, uris };
};
export default useFirebase;

import React, { useState } from 'react'
import firebase from "firebase";
import {Button,Input} from "reactstrap"
import { storage, db } from "./firebase"
import "./imageupload.css"

const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    // handleChange('')
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

    
      

    return (
        <div className="upload_box">
          
<progress className="imageupload__progress" value={progress} max="100" />
<Input type="text" placeholder="Enter Cpation"  value={caption} onChange={e => setCaption(e.target.value)}  required="required"/>
<input type="file" onChange= { handleChange} />
<Button onClick={handleUpload}>upload</Button>
        </div>
    )
}

export default ImageUpload

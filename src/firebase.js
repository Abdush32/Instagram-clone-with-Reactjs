import firebase from "firebase"
const firebaseApp = firebase.initializeApp ({
//ENTER YOUR CONFIG-FILE
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage()
  export {db, auth, storage} ;
  

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
